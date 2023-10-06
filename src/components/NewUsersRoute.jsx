import NewUsersLayout from './NewUsersLayout'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function UserProtection() {


    if (cargando) return <main className='bg-emerald-700 text-center text-white h-screen'>cargando</main> 

    const usuarios = useSelector( state => state.usuarios)



  return <>
    {
        usuarios.isAuthenticated && !usuarios.user.role ? <NewUsersLayout/> :  <Navigate to="/login" />
    }
  </>
}
