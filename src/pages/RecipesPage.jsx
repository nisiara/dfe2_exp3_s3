import { Link } from "react-router";

const RecipesPage = ({listaRecetas, loading}) => {

  return ( 
    <main>
      
      {
        loading 
          ? <p className="text-sm underline text-center text-slate-500">Cargando lista de eventos</p> 
          : (
            <section className="inline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[5vw] gap-y-[15vh] md:gap-y-[10vh]">
              {(listaRecetas || []).map( receta => (
                <article key={receta.id} className="text-left">
                  <img src={receta.imagen_url} alt={receta.nombre} className="text-xs" />
                  <div className="uppercase text-xs font-bold mt-4">
                    {receta.categorias.map( categoria => 
                      categoria.split(',').map((cat, index) => (
                        <span key={index} className="font-normal text-amber-500 mr-2">{cat.trim()} {index !== cat.length - 1 ? ' - ' : ''}</span>
                      ))
                    )}
                  </div>
                  <h3 className="font-bold">{receta.nombreComida}</h3>
                  <Link to={`/recipes/${receta.id}`} className="mt-6 text-xs underline">Ver Receta</Link>
                </article>
              ))}
            </section>
          )
      }
    </main>
  )
};

 
export default RecipesPage;