import { NavLink } from "react-router";

const navStyles = {
  base: 'text-lg px-2 py-1 block font-extrabold text-indigo-900',
  active: 'border-b-2 border-b-indigo-900'
}

const Header = () => {
  return ( 
    <header className="header mb-2 md:mb-10 flex flex-col justify-center items-center py-6">
      <img src="/images/logo.png" alt="Logo Milk & Crumbs" className="w-[216px]"/>
      
      <nav className="menu mt-5 pt-6 border-t border-t-indigo-100 w-full"> 
        <ul className="flex flex-col md:flex-row justify-center align-middle gap-3">
          <li>
            <NavLink to="/" className={({isActive}) => `${navStyles.base} ${isActive ? navStyles.active : ''}`}>Inicio</NavLink>
          </li>
          <li>
            <NavLink to="/recipes" end className={({isActive}) => `${navStyles.base} ${isActive ? navStyles.active : ''}`}>Ver todas las recetas</NavLink>
          </li>
          <li>
            <NavLink to="/about-us" className={({isActive}) => `${navStyles.base} ${isActive ? navStyles.active : ''}`}>Nosotros</NavLink>
          </li>
        </ul>
      </nav>
     </header>
  );
}
 
export default Header;