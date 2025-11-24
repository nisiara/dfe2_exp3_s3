import React, { Suspense } from "react";
import { Routes, Route } from "react-router";
import Loading from "../components/loading/Loading";

const HomePage = React.lazy( () => import("../pages/HomePage") )
const EventsPage = React.lazy( () => import("../pages/EventsPage"))
const EventDetailPage = React.lazy( () => import("../pages/EventDetailPage"))
const AboutUsPage = React.lazy( () => import("../pages/AboutUsPage"))


const AppRoutes = ({listaEventos, loading, error}) => {
  return ( 
    <Suspense fallback={<Loading />} >
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/events" element={<EventsPage listaEventos={listaEventos} loading={loading} error={error}/>} />
        <Route path="/events/:id" element={<EventDetailPage listaEventos={listaEventos} />} />
        <Route path="/about-us" element={<AboutUsPage />} />
      </Routes>
    </Suspense>
  );
}
 
export default AppRoutes;