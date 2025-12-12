import { useParams } from "react-router";
import { PageTitle } from "../components/common/Common";
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'


const GQL_OBTENER_EVENTO_POR_ID = gql`
  query ObtenerEventoPorID($id: String!) {
    evento(id: $id) {
      nombre_evento
      tipo_evento
      fecha
      ciudad
      locacion
      hora
      descripcion
      precios
    }
  }
`;


const EventDetailPage = () => {
  const { id } = useParams();
  
  const eventoId = id.toLowerCase();

  const { loading, error, data } = useQuery(GQL_OBTENER_EVENTO_POR_ID, {
    variables: { id: eventoId },
    fetchPolicy: 'network-only'
  });

  if (loading) {
    return (
      <section>
        <PageTitle title='Detalle del Evento'/>
        <p className="text-center text-gray-950 font-bold">Cargando detalle del evento...</p>
      </section>
    );
  }
  
  if (error) {
    return (
      <section>
        <PageTitle title='Detalle del Evento'/>
        <div className="text-sm text-center text-red-900 p-4 bg-red-200 rounded-md">
          <p>Error al cargar el detalle del evento</p>
          <p>{error.message}</p> 
        </div>
      </section>
    );
  }

  const EVENTO = data?.evento;
  
  if (!EVENTO) {
    return (
      <section>
        <PageTitle title='Detalle del Evento'/>
        <div className="text-sm text-center text-yellow-900 p-4 bg-yellow-200 rounded-md">
          <p>No se encontró el evento con ID: {id}</p>
        </div>
      </section>
    );
  }
  
  return (
    <section>
      
      <h6 className="uppercase text-sm text-amber-600	">{EVENTO.tipo_evento}</h6>
      <h1 className="text-3xl font-bold text-gray-950 uppercase">{EVENTO.nombre_evento}</h1>
      <h4  className="text-xl mb-6">{EVENTO.descripcion}</h4>
      <hr />
      <aside className="grid grid-cols-12 gap-4 mt-8">
         <div className="py-4 col-span-12 md:col-span-6  text-gray-950 flex flex-col border b-color-gray-200">
          <span className="uppercase text-xs">locacion</span>
          <b className="text-2xl capitalize">{EVENTO.locacion}</b>
        </div>
         <div className="py-4 col-span-12 md:col-span-6  text-gray-950 flex flex-col border b-color-gray-200">
          <span className="uppercase text-xs">ciudad</span>
          <b className="text-2xl capitalize">{EVENTO.ciudad}</b>
        </div>
         <div className="py-4 col-span-12 md:col-span-6  text-gray-950 flex flex-col border b-color-gray-200">
          <span className="uppercase text-xs">fecha</span>
          <b className="text-2xl capitalize">{EVENTO.fecha}</b>
        </div>
         <div className="py-4 col-span-12 md:col-span-6  text-gray-950 flex flex-col border b-color-gray-200">
          <span className="uppercase text-xs">hora</span>
          <b className="text-2xl capitalize">{EVENTO.hora}</b>
        </div>
         <div className="py-4 col-span-12 md:col-span-6  text-gray-950 flex flex-col border b-color-gray-200">
          <span className="uppercase text-xs mb-2">precios</span>
          <div className="flex w-full justify-center gap-6">
            {Object.entries(EVENTO.precios || {}).map(([zona, precio]) => (
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
 
export default EventDetailPage;