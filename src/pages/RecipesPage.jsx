import { Link } from "react-router";

const EventsPage = ({listaEventos, loading}) => {

  return ( 
    <main>
      
      {
        loading 
          ? <p className="text-sm underline text-center text-slate-500">Cargando lista de eventos</p> 
          : (
            <section className="inline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[5vw] gap-y-[15vh] md:gap-y-[10vh]">
              {(listaEventos || []).map( evento => (
                <article key={evento.id} className="text-left">
                  <img src={evento.imagen_url} alt={evento.nombre_evento} className="text-xs" />
                  <div className="uppercase text-xs font-bold mt-4">{evento.locacion} - {evento.ciudad} <span className="font-normal text-amber-500">/ {evento.tipo_evento}</span></div>
                  <h3 className="font-bold">{evento.nombre_evento}</h3>
                  <small className="block text-neutral-400">{evento.fecha}</small>
                  <Link to={`/events/${evento.id}`} className="mt-6 text-xs underline">Ver Evento</Link>
                </article>
              ))}
            </section>
          )
      }
    </main>
  )
};

 
export default EventsPage;