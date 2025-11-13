import { useEffect, useState } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'

const App = () => {

  const [data, setData] = useState([])
  
  useEffect(() => {
    fetch('/api/patients')
    .then( response => {
      if(!response.ok)
        throw new Error(response.status + " - " + response.statusText);

      return response.json()
    })
    .then( info => {
      setData(info)
     
    })
    .catch(error => {
      console.error(error.message)
    })

  }, [])


  return (
    <AppRoutes patientList={data} />
  )
}

export default App
