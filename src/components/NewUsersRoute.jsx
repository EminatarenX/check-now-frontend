import NewUsersLayout from './NewUsersLayout'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function UserProtection() {
    const usuarios = useSelector( state => state.usuarios)
    const cargando = useSelector( state => state.usuarios.loading)

    if(cargando) return <p>Cargando...</p>


  return <>
    {
        usuarios.isAuthenticated && !usuarios.user.role ? <NewUsersLayout/> :  <Navigate to="/login" />
    }
  </>
}
