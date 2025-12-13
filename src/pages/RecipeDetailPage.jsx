import { useParams } from "react-router";
import { PageTitle } from "../components/common/Common";
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import Loading from "../components/loading/Loading";


const GQL_OBTENER_RECETA_POR_ID = gql`
  query ObtenerRecetaPorID($id: ID!) {
    receta(id: $id) {
      imagen
      nombre
      descripcion
      ingredientes
      tiempoPreparacion
      tiempoCoccion
      cantidadPorciones
      categorias
      procedimiento
      observaciones
    }
  }
`;


const RecipeDetailPage = () => {
  const { id } = useParams();
  
  const { loading, error, data } = useQuery(GQL_OBTENER_RECETA_POR_ID, {
    variables: { id: id },
    fetchPolicy: 'network-only'
  });

  if (loading) {
    return (
      <section>
        <Loading />
      </section>
    );
  }
  
  if (error) {
    return (
      <section>
        <div className="text-sm text-center text-red-900 p-4 bg-red-200 rounded-md">
          <p>Error al cargar la receta</p>
          <p>{error.message}</p> 
        </div>
      </section>
    );
  }

  const RECETA = data?.receta;
  
  if (!RECETA) {
    return (
      <section>
        <PageTitle title='Detalle Receta'/>
        <div className="text-sm text-center text-yellow-900 p-4 bg-yellow-200 rounded-md">
          <p>No se encontró receta con el ID: {id}</p>
        </div>
      </section>
    );
  }
  
  return (
    <main>
      <img className="object-cover h-[400px] w-full mb-7 rounded-lg" src={RECETA.imagen} alt={RECETA.nombre} />
      <ul className="flex gap-2 justify-center mb-3">
        {RECETA.categorias.map( categoria => (
          <li className="text-xs bg-indigo-100 py-1 px-3 rounded-md text-indigo-700">{categoria}</li>
        ))}
      </ul>
      <h1 className="text-3xl text-center font-bold text-indigo-900 uppercase">{RECETA.nombre}</h1>
      <h4  className="text-md font-light text-center mb-6 text-zinc-400">{RECETA.descripcion}</h4>

      
      <aside className="grid grid-cols-12 gap-4 pt-5 mt-9 border-t border-t-indigo-100">
         <div className="col-span-12 md:col-span-4 flex flex-col text-center">
          <span className="uppercase text-xs text-zinc-400">tiempo de preparación</span>
          <b className="text-xl capitalize text-indigo-900">{RECETA.tiempoPreparacion}</b>
        </div>
         <div className="col-span-12 md:col-span-4 flex flex-col text-center">
          <span className="uppercase text-xs text-zinc-400">tiempo de cocción</span>
          <b className="text-xl capitalize text-indigo-900">{RECETA.tiempoCoccion}</b>
        </div>
         <div className="col-span-12 md:col-span-4 flex flex-col text-center">
          <span className="uppercase text-xs text-zinc-400">porciones</span>
          <b className="text-xl capitalize text-indigo-900">{RECETA.cantidadPorciones}</b>
        </div>
      </aside>

      <section className="grid grid-cols-12 gap-4 pt-12 mt-6 border-t border-t-indigo-100">
        <aside className="col-span-12 md:col-span-4">
          <h5 className="uppercase text-xs text-zinc-400 mb-2">ingredientes</h5>
          <ul className="list-disc list-inside">
            {RECETA.ingredientes.map(ingrediente => (
              <li className="text-sm capitalize text-indigo-900 mt-1">{ingrediente}</li>
            ))}
          </ul>

          <h5 className="uppercase text-xs text-zinc-400 mt-6">observaciones</h5>
          <p className="text-sm text-indigo-900 mt-1">{RECETA.observaciones ? RECETA.observaciones : 'Sin observaciones'}</p>

        </aside>
        <aside className="col-span-12 md:col-span-8">
          <h5 className="uppercase text-xs text-zinc-400 mb-2">Preparación</h5>
          <ol className="list-decimal list-inside">
            {RECETA.procedimiento.map(proc => (
              <li className="text-sm capitalize text-indigo-900 mt-1">{proc}</li>
            ))}
          </ol>
        </aside>
      </section>
    </main>
  );
}
 
export default RecipeDetailPage;