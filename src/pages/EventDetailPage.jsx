import { useParams } from "react-router";
import { PageTitle } from "../components/common/Common";
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'


const GQL_OBTENER_EVENTO_POR_ID = gql`
  query ObtenerEventoPorID($id: String!) {
    evento(id: $id) {
      nombre_evento
      tipo_evento
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
        <p className="text-center text-slate-500">Cargando detalle del evento...</p>
      </section>
    );
  }
  
  if (error) {
    return (
      <section>
        <PageTitle title='Detalle del Evento'/>
        <div className="text-center text-red-500 p-4">
          <p>Error al cargar el detalle del evento</p>
          <p className="text-sm">{error.message}</p>
          <p className="text-xs text-slate-400">ID buscado: {id}</p>
        </div>
      </section>
    );
  }

  const EVENTO = data?.evento;
  
  if (!EVENTO) {
    return (
      <section>
        <PageTitle title='Detalle del Evento'/>
        <div className="text-center text-yellow-600 p-4">
          <p>No se encontró el evento con ID: {id}</p>
        </div>
      </section>
    );
  }
  
  return (
    <section>
      <PageTitle title='Detalle del Evento'/>
      <h1 className="text-2xl font-bold mb-5 text-slate-500">{EVENTO.nombre_evento}</h1>
      <aside className="grid grid-cols-12 gap-4">
         <div className="py-4 col-span-12 md:col-span-6 text-slate-500 flex flex-col border b-color-slate-400">
          <span className="uppercase text-xs">tipo evento</span>
          <b className="text-2xl capitalize">{EVENTO.tipo_evento}</b>
        </div>
      </aside>
    </section>
  );
}
 
export default EventDetailPage;