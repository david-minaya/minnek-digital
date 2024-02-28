import style from './home.module.css';
import { useFetchBreeds } from '../../hooks/useFetchBreeds';
import { Header } from '../../components/header/header.component';
import { Item } from '../../components/item/item.component';

export function Home() {

  const breeds = useFetchBreeds();

  return (
    <div className={style.container}>
      <Header/>
      <div className={style.content}>
        <div className={style.listContainer}>
          <h2 className={style.title}>Dog List</h2>
          <ul className={style.list}>
            {breeds.map(breed => 
              <Item 
                key={breed.name}
                breed={breed}/>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
