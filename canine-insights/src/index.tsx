import './style.css';
import { createRoot } from 'react-dom/client';
import { Home } from './pages/home/home.component';
import { Table } from './pages/table/table.component';

import { 
  Route,
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements,
} from 'react-router-dom';

const root = createRoot(document.getElementById('root')!);

root.render(
  <RouterProvider router={createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route path='/' element={<Home/>}/>
        <Route path='/table' element={<Table/>}/>
      </Route>
    )
  )}/>
);
