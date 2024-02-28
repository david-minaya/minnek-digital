import { useEffect, useState } from 'react';
import { Breed } from '../../interfaces/breed';
import style from './item.module.css';

interface Props {
  breed: Breed;
}

export function Item(props: Props) {

  const { breed } = props;

  const [image, setImage] = useState<string>();

  useEffect(() => {
    fetch(`https://dog.ceo/api/breed/${breed.id}/images/random`)
      .then(res => res.json())
      .then(res => setImage(res.message));
  }, [breed.name]);

  return (
    <li className={style.item}>
      <img
        style={{ visibility: image ? 'visible' : 'hidden' }} 
        className={style.image} 
        src={image}/>
      <span className={style.title}>{breed.name}</span>
      <div className={style.subBreeds}>
        {breed.subBreeds.length === 0 &&
          <span className={style.subBreed}>Not sub-breed</span>
        }
        {breed.subBreeds.slice(0, 3).map(sub =>
          <span 
            key={sub.id}
            className={style.subBreed}>
            {sub.name}
          </span> 
        )}
        {breed.subBreeds.length >= 3 &&
          <span className={style.subBreed}>...</span>
        }
      </div>
    </li>
  );
}
