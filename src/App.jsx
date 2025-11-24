import { useEffect, useState } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import Header from './layout/Header'
import Footer from './layout/Footer'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'


const GQL_OBTENER_EVENTOS = gql`
  query ObtenerEventos {
    eventos {
      id
      nombre_evento
      tipo_evento
      locacion
      ciudad
      fecha
      
    }
  }
`

const App = () => {

  const {loading, error, data} = useQuery(GQL_OBTENER_EVENTOS, {
    fetchPolicy: 'network-only'
  })

  const [dataEventos, setDataEventos] = useState([])
  // const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if(data){
      setDataEventos(data.eventos)
    }
    
  }, [error, data])


  return (
    <>
      <Header/>
      <AppRoutes listaEventos={dataEventos} loading={loading} error={error} />
      <Footer/>
    </>
  )
}

export default App
