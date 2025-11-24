import { Link } from "react-router";
import { PageTitle } from "../components/common/Common";

const EventsPage = ({listaEventos, loading, error}) => {

  const tableStyles = {
    tableContainer: 'border border-slate-200 rounded-md',
    table: 'border-collapse table-auto w-full text-sm',
    thead: 'bg-slate-100',
    theadCell: 'border-b dark:border-slate-600 font-sm p-4 pl-8 pb-3 text-slate-400 dark:text-slate-200 text-center',
    tbody: 'bg-white dark:bg-slate-800',
    cell: 'border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-xs'
  }


  if (error) {
    return (
      <section>
        <PageTitle title='Lista de Eventos'/>
        <div className="text-center text-red-500 p-4">
          <p>Error al cargar la lista de eventos</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </section>
    );
  }

  return ( 
    <section>
      <PageTitle title='Lista de Eventos'/>
      {
        loading 
          ? <p className="text-sm underline text-center text-slate-500">Cargando lista de eventos</p> 
          : (
            <section className="inline-grid grid-cols-3 gap-6">
              {(listaEventos || []).map( evento => (
                <aside key={evento.id}>
                  <img src="https://placehold.co/600x400" alt={evento.nombre_evento} className="" />
                  
                  <div className="uppercase">{evento.locacion} - {evento.ciudad} <span>/ {evento.tipo_evento}</span></div>
                  <h3>{evento.nombre_evento}</h3>
                  <small className="block">{evento.fecha}</small>
                  
                  
                  <Link to={`/events/${evento.id}`} className="text-xs underline">Ver Evento</Link>
                </aside>
              ))}
            </section>
          
                 
                  
               
             
            
          )
      }
      
    </section>
  )
};

 
export default EventsPage;