import { Link } from "react-router";
const PatientsPage = ({patientList}) => {

  const tableStyles = {
    tableContainer: 'border border-slate-200 rounded-md',
    table: 'border-collapse table-auto w-full text-sm',
    thead: 'bg-slate-100',
    theadCell: 'border-b dark:border-slate-600 font-sm p-4 pl-8 pb-3 text-slate-400 dark:text-slate-200 text-center',
    tbody: 'bg-white dark:bg-slate-800',
    cell: 'border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-xs'
  }

  console.log('dataList', patientList)

  return ( 
  <div className={tableStyles.tableContainer}>
    <table className={tableStyles.table}>
      <thead className={tableStyles.thead}>
        <tr>
          <th className={tableStyles.theadCell}>Número Paciente</th>
          <th className={tableStyles.theadCell}>Nombre Paciente</th>
          <th className={tableStyles.theadCell}>Edad</th>
          <th className={tableStyles.theadCell}>Fecha Consulta</th>
          <th className={tableStyles.theadCell}>Médico</th>
          <th className={tableStyles.theadCell}></th>
        </tr>
      </thead>
      <tbody className={tableStyles.tbody}>
        {patientList.map( patient => (
          <tr key={patient.numeroPaciente}>
            <td className={tableStyles.cell}>{patient.numeroPaciente}</td>
            <td className={tableStyles.cell}>{patient.nombrePaciente}</td>
            <td className={tableStyles.cell}>{patient.edad}</td>
            <td className={tableStyles.cell}>{patient.atenciones[0].fecha}</td>
            <td className={tableStyles.cell}>{patient.atenciones[0].nombreMedico}</td>
            <td className={tableStyles.cell}><Link to={`/patients/${patient.numeroPaciente.toLowerCase()}`} className="text-xs underline">Ver Paciente</Link></td>
          </tr>
        ))}
        
      </tbody>
    </table>
  </div>
)};

 
export default PatientsPage;