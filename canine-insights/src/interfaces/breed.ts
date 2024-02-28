export interface Breed {
  id: string;
  name: string;
  subBreeds: { id: string, name: string }[];
}
