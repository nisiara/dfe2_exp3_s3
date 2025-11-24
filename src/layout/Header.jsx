import { NavLink } from "react-router";

const navStyles = {
  base: 'text-sm px-2 py-1 block font-medium text-slate-500',
  active: 'border-b-2 border-b-slate-500'
}

const Header = () => {
  return ( 
    <header className="header mb-2 md:mb-10 md:flex align-middle py-6">
      <img src="images/logo.svg" alt="" />
      {/* <h1 className="mb-3 md:mb-0 text-center text-slate-500 md:text-left text-3xl font-bold">Ticket Master</h1> */}
      
      <nav className="md:ml-auto"> 
        <ul className="flex flex-col md:flex-row md:justify-normal align-middle gap-3">
          <li>
            <NavLink to="/" className={({isActive}) => `${navStyles.base} ${isActive ? navStyles.active : ''}`}>Inicio</NavLink>
          </li>
          <li>
            <NavLink to="/events" end className={({isActive}) => `${navStyles.base} ${isActive ? navStyles.active : ''}`}>Lista de Eventos</NavLink>
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