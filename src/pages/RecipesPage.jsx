import { Link } from "react-router";
import Loading from "../components/loading/Loading";

const RecipesPage = ({listaRecetas, loading}) => {

  return ( 
    <main>
      
      {
        loading 
          ? <Loading/>
          : (
            <section className="inline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[5vw] gap-y-[15vh] md:gap-y-[10vh]">
              {(listaRecetas || []).map( receta => (
                <article key={receta.id} className="text-left">
                  <img src={receta.imagen} alt={receta.nombre} className="text-xs rounded-lg" />
                  {/* <div className="uppercase text-xs font-bold mt-4">
                    {receta.categorias.map( categoria => 
                      categoria.split(',').map((cat, index) => (
                        <span key={index} className="font-normal text-amber-500 mr-2">{cat.trim()} {index !== cat.length - 1 ? ' - ' : ''}</span>
                      ))
                    )}
                  </div> */}
                  <ul className="flex gap-2 mt-3">
                    {receta.categorias.map( categoria => (
                      <li className="text-xs bg-indigo-100 py-1 px-2 rounded-md text-indigo-700">{categoria}</li>
                    ))}
                  </ul>
                  <h3 className="font-medium text-xl text-indigo-900">{receta.nombre}</h3>
                  <Link to={`/recipes/${receta.id}`} className="mt-6 text-xs underline text-indigo-900">Ver Receta</Link>
                </article>
              ))}
            </section>
          )
      }
    </main>
  )
};

 
export default RecipesPage;