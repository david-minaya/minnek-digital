import style from './table.module.css';
import { useFetchBreeds } from '../../hooks/useFetchBreeds';
import { Header } from '../../components/header/header.component';
import { ChangeEvent, useEffect, useState } from 'react';
import { Breed } from '../../interfaces/breed';
import { Button } from '../../components/button/button.component';
import { Input } from '../../components/input/input.component';
import { AddModal } from '../../components/add-modal/add-modal.component';
import { Row } from '../../components/row/row.component';

export function Table() {

  const originalBreeds = useFetchBreeds();
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [select, setSelect] = useState('');
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    setBreeds(originalBreeds);
  }, [originalBreeds]);
  
  function handleFilter(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.toLowerCase();
    setBreeds(
      originalBreeds.filter(breed =>
        breed.name.toLowerCase().includes(value) ||
        breed.subBreeds
          .map(sub => sub.name)
          .join()
          .toLowerCase()
          .includes(value)
      )
    );
  }

  function handleSort(value: string) {

    setSelect(value);

    if (value === '' || value === 'Breed') {
      setBreeds(breeds => breeds.toSorted((b1, b2) => 
        b1.name.localeCompare(b2.name)
      ));
    }

    if (value === 'Sub-breed') {
      setBreeds(breeds => breeds.toSorted((b1, b2) => {
        const name1 = b1.subBreeds.length !== 0 ? b1.subBreeds[0].name : 'z';
        const name2 = b2.subBreeds.length !== 0 ? b2.subBreeds[0].name : 'z';
        return name1.localeCompare(name2);
      }));
    }
  }

  function handleAddBreed(breed: Breed) {

    if (breeds.find(b => b.id === breed.id)) {
      throw new Error('Already exists a breed with this name');
    }

    setBreeds(breeds => [...breeds, breed]);
    handleSort(select);
    setOpenAddModal(false);
  }

  function handleEditBreed(breed: Breed) {
    setBreeds(breeds => breeds.map(b => b.id === breed.id ? breed : b ));
  }

  function handleDeleteBreed(id: string) {
    setBreeds(breeds => breeds.filter(breed => breed.id !== id));
  }

  return (
    <div className={style.container}>
      <Header/>
      <div className={style.content}>
        <div className={style.tableContainer}>
          <h2 className={style.title}>Dog List</h2>
          <div className={style.toolbar}>
            <Input
              placeholder='Filter'
              onChange={handleFilter}/>
            <Button 
              className={style.button}
              title='Add'
              onClick={() => setOpenAddModal(true)}/>
            <div className={style.sort}>
              <select
                className={style.select}
                value={select}
                onChange={e => handleSort(e.target.value)}>
                <option defaultValue='' disabled>Sort</option>
                <option>Breed</option>
                <option>Sub-breed</option>
              </select>
            </div>
          </div>
          <table className={style.table}>
            <thead className={style.tableHeader}>
              <tr>
                <th align='left'>Breed</th>
                <th align='left'>Sub-breeds</th>
                <th align='left'></th>
              </tr>
            </thead>
            <tbody className={style.tableBody}>
              {breeds.map(breed =>
                <Row 
                  key={breed.id}
                  breed={breed}
                  onEdit={handleEditBreed}
                  onDelete={handleDeleteBreed}/> 
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AddModal
        open={openAddModal}
        title='Add breed'
        onCancel={() => setOpenAddModal(false)}
        onSave={handleAddBreed}/>
    </div>
  );
}
