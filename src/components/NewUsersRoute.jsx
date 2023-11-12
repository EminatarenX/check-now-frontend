import NewUsersLayout from './NewUsersLayout'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function UserProtection() {

  const cargando = useSelector( state => state.usuarios?.loading)
  const usuarios = useSelector( state => state.usuarios)
  

    if (cargando) return <main className='bg-emerald-700 text-center text-white h-screen'>cargando</main> 




  return <>
    {
        usuarios.isAuthenticated && usuarios.user.role === 'new' ? <NewUsersLayout/> :  <Navigate to={`/`}/>
    }
  </>
}
