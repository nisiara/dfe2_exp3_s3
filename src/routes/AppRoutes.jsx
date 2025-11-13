import React, { Suspense } from "react";
import { Routes, Route } from "react-router";

const HomePage = React.lazy( () => import("../pages/HomePage") )
const PatientsPage = React.lazy( () => import("../pages/PatientsPage"))
const PatientDetailPage = React.lazy( () => import("../pages/PatientDetailPage"))


const AppRoutes = ({patientList}) => {
  return ( 
    <Suspense fallback={"Cargando"}>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/patients" element={<PatientsPage patientList={patientList}/>} />
        <Route path="/patients/:id" element={<PatientDetailPage patientList={patientList}/>} />
      </Routes>
    </Suspense>
  );
}
 
export default AppRoutes;