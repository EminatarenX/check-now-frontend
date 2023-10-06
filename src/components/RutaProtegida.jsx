import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import AdminLayout from "./AdminLayout"

export default function RutaProtegida() {

    const usuarios = useSelector( state => state.usuarios)
    const cargando = useSelector( state => state.usuarios.loading)

    if(cargando) return <main className='bg-emerald-700 text-center h-screen'>cargando</main> 


  return <>
    {
        usuarios.isAuthenticated && usuarios?.user?.role === 'admin' ? <AdminLayout/> :  <Navigate to="/login" />
    }
  </>
}
