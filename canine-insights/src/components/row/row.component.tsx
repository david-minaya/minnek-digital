import style from './row.module.css';
import { Breed } from '../../interfaces/breed';
import { More } from '../../icons/more';
import { useState } from 'react';
import { AddModal } from '../add-modal/add-modal.component';

interface Props {
  breed: Breed;
  onEdit: (breed: Breed) => void;
  onDelete: (id: string) => void;
}

export function Row(props: Props) {

  const {
    breed,
    onEdit,
    onDelete
  } = props;

  const [openMenu, setOpenMenu] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  function handleOpenEditModal() {
    setOpenMenu(false);
    setOpenEditModal(true);
  }

  function handleDelete() {
    setOpenMenu(false);
    onDelete(breed.id);
  }

  return (
    <tr 
      key={breed.id}
      className={style.row}>
      <td>{breed.name}</td>
      <td>
        {breed.subBreeds.map(sub => 
          <span 
            key={sub.id}
            className={style.subBreed}>
            {sub.name}
          </span>
        )}
      </td>
      <td>
        <div className={style.menuCell}>
          <More 
            className={style.moreIcon}
            onClick={() => setOpenMenu(state => !state)}/>
          {openMenu &&
            <menu className={style.menu}>
              <li className={style.item} onClick={handleOpenEditModal}>Editar</li>
              <li className={style.item} onClick={handleDelete}>Eliminar</li>
            </menu>
          }
        </div>
      </td>
      <AddModal
        open={openEditModal}
        title='Edit breed'
        breed={breed}
        onCancel={() => setOpenEditModal(false)}
        onSave={breed => onEdit(breed)}/>
    </tr> 
  );
}
