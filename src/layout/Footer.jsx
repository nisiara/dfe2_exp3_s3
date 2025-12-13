import { Link } from "react-router";

const Footer = () => {
  const DATE = new Date();
  const FULL_YEAR = DATE.getFullYear()
  return ( 
    <footer className="mt-10 pt-6 border-t border-t-indigo-100">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-10 mb-10">
        <aside className="col-span-1 sm:col-span-6 lg:col-span-9">
          <h2 className="text-left font-medium text-lg text-indigo-900">Milk & Crumbs</h2>
          <small className="text-left block leading-1 md:w-3/6 font-light text-zinc-400">En Milk & Crumbs, creemos que la buena comida no tiene por qué ser difícil. Nuestro objetivo es acercarte la alegría de la cocina casera a tu día a día, ofreciéndote una vasta colección de recetas sencillas, probadas y deliciosas que puedes preparar fácilmente con lo que tienes en tu despensa. Desde platos reconfortantes de la abuela hasta soluciones rápidas para la cena de hoy, aquí encontrarás la inspiración perfecta para cada momento.</small>
        </aside>
        <nav className="col-span-1 sm:col-span-6 lg:col-span-3">
          <ul className="flex flex-col sm:justify-between md:block gap-2 sm:gap-1">
            <li><Link className="underline text-xs capitalize text-left sm:text-right block mt-1 text-indigo-900" to="/">Inicio</Link></li>
            <li><Link className="underline text-xs capitalize text-left sm:text-right block mt-1 text-indigo-900" to="/recipes" end>Todas las recetas</Link></li>
            <li><Link className="underline text-xs capitalize text-left sm:text-right block mt-1 text-indigo-900" to="/about-us">Nosotros</Link></li>
          </ul>
        </nav>
      </div>
      
      <p className="text-center text-xs border-t border-t-indigo-100 pt-4 pb-8 text-indigo-700">{FULL_YEAR}</p>
    </footer>
   );
}
 
export default Footer;