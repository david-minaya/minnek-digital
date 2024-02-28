import { Link, NavLink } from 'react-router-dom';
import style from './header.module.css';

export function Header() {

  return (
    <header className={style.header}>
      <Link 
        to='/'
        className={style.navLink}>
        <h1 className={style.title}>MINNEK</h1>
      </Link>
      <NavLink 
        to='/table'
        className={style.navLink}>
        <span className={style.tableLink}>Table</span>
      </NavLink>
    </header>
  );
}
