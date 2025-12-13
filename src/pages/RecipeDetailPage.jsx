import { useParams } from "react-router";
import { PageTitle } from "../components/common/Common";
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import Loading from "../components/loading/Loading";


const GQL_OBTENER_RECETA_POR_ID = gql`
  query ObtenerRecetaPorID($id: ID!) {
    receta(id: $id) {
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
        <PageTitle title='Detalle Receta'/>
        <Loading />
      </section>
    );
  }
  
  if (error) {
    return (
      <section>
        <PageTitle title='Detalle Receta'/>
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
    <section>
      
      <h6 className="uppercase text-sm text-amber-600	">{RECETA.tipo_RECETA}</h6>
      <h1 className="text-3xl font-bold text-gray-950 uppercase">{RECETA.nombre}</h1>
      <h4  className="text-xl mb-6">{RECETA.descripcion}</h4>
      <hr />
      <aside className="grid grid-cols-12 gap-4 mt-8">
         <div className="py-4 col-span-12 md:col-span-6  text-gray-950 flex flex-col border b-color-gray-200">
          <span className="uppercase text-xs">locacion</span>
          <b className="text-2xl capitalize">{RECETA.locacion}</b>
        </div>
         <div className="py-4 col-span-12 md:col-span-6  text-gray-950 flex flex-col border b-color-gray-200">
          <span className="uppercase text-xs">ciudad</span>
          <b className="text-2xl capitalize">{RECETA.ciudad}</b>
        </div>
         <div className="py-4 col-span-12 md:col-span-6  text-gray-950 flex flex-col border b-color-gray-200">
          <span className="uppercase text-xs">fecha</span>
          <b className="text-2xl capitalize">{RECETA.fecha}</b>
        </div>
         <div className="py-4 col-span-12 md:col-span-6  text-gray-950 flex flex-col border b-color-gray-200">
          <span className="uppercase text-xs">hora</span>
          <b className="text-2xl capitalize">{RECETA.hora}</b>
        </div>
         <div className="py-4 col-span-12 md:col-span-6  text-gray-950 flex flex-col border b-color-gray-200">
          <span className="uppercase text-xs mb-2">precios</span>
          <div className="flex w-full justify-center gap-6">
            {Object.entries(RECETA.precios || {}).map(([zona, precio]) => (
              <div key={zona} className="flex flex-col text-sm justify-center items-center">
                <span className="text-xs uppercase text-slate-500">{zona.replace('_', ' ')}</span>
                <b className="text-2xl capitalize">${precio.toLocaleString('es-CL')}</b>
              </div>
            ))}
          </div>
            
        </div>
      </aside>
    </section>
  );
}
 
export default RecipeDetailPage;