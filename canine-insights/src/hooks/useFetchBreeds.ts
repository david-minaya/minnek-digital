import { useEffect, useState } from 'react';
import { Breed } from '../interfaces/breed';

export function useFetchBreeds() {

  const [breeds, setBreeds] = useState<Breed[]>([]);

  useEffect(() => {
    
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(res => res.json())
      .then(data => {

        const breeds: Breed[] = [];
  
        for (const key of Object.keys(data.message)) {
          breeds.push({
            id: key, 
            name: capitalize(key), 
            subBreeds: data.message[key]
              .map((sub: string) => ({ 
                id: sub,
                name: capitalize(sub) 
              })) 
          });
        }
  
        setBreeds(breeds);
      });
  }, []);

  function capitalize(name: string) {
    return name[0].toUpperCase() + name.slice(1);
  }

  return breeds;
}
