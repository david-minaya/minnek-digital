import style from './add-modal.module.css';
import { useEffect, useState } from 'react';
import { Breed } from '../../interfaces/breed';
import { Button } from '../button/button.component';
import { Input } from '../input/input.component';
import { Close } from '../../icons/close';
import { createPortal } from 'react-dom';

interface Props {
  open: boolean;
  title: string;
  breed?: Breed;
  onSave: (breed: Breed) => void;
  onCancel: () => void;
}

export function AddModal(props: Props) {

  const {
    open,
    title,
    breed,
    onSave,
    onCancel
  } = props;

  const [name, setName] = useState('');
  const [subBreed, setSubBreed] = useState('');
  const [subBreeds, setSubBreeds] = useState<Breed['subBreeds']>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (open && breed) {
      setName(breed.name);
      setSubBreeds(breed.subBreeds);
    }
  }, [open]);

  function handleAddSubBreed() {

    if (subBreed.trim() === '') {
      return;
    }

    if (subBreeds.find(sub => sub.name === subBreed)) {
      setError('Already exists a sub-breed with this name');
      return;
    }

    setSubBreeds(subBreeds => [
      ...subBreeds, 
      { id: subBreed.toLowerCase(), name: subBreed }
    ]);

    setSubBreed('');
    setError(undefined);
  }

  function handleRemoveSubBreed(id: string) {
    setSubBreeds(subBreeds => subBreeds.filter(sub => sub.id !== id));
  }

  function handleSave() {

    if (name.trim() === '') {
      setError('Name field is required');
      return;
    }

    try {

      onSave({
        id: breed?.id || name.toLowerCase(),
        name: name,
        subBreeds: subBreeds
      });

      handleCancel();
      
    } catch (err: any) {

      setError(err.message);
    }
  }

  function handleCancel() {
    setName('');
    setSubBreed('');
    setSubBreeds([]);
    setError(undefined);
    onCancel?.();
  }

  if (!open) return;

  return createPortal(
    <div className={style.container}>
      <div className={style.card}>
        <h2 className={style.title}>{title}</h2>
        <div className={style.content}>
          <label className={style.label}>Name</label>
          <Input 
            className={style.breedInput}
            value={name} 
            onChange={e => setName(e.target.value)}/>
          <label className={style.label}>Sub-breeds</label>
          <div className={style.addSubBreeds}>
            <Input 
              className={style.subBreedInput}
              value={subBreed} 
              onChange={e => setSubBreed(e.target.value)}
              onEnter={handleAddSubBreed}/>
            <Button 
              title='Add' 
              onClick={handleAddSubBreed}/>
          </div>
          <ul className={style.list}>
            {subBreeds.map(sub =>
              <li 
                key={sub.id}
                className={style.item}>
                <span>{sub.name}</span>
                <Close
                  className={style.closeIcon} 
                  onClick={() => handleRemoveSubBreed(sub.id)}/>
              </li>
            )}
          </ul>
        </div>
        {error && 
          <div className={style.error}>{error}</div>
        }
        <div className={style.buttons}>
          <Button title='Cancel' onClick={handleCancel}/>
          <Button title='Save' onClick={handleSave}/>
        </div>
      </div>
    </div>
    , document.body);
}
