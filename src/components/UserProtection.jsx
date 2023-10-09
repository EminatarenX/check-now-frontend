import UserLayout from './UserLayout'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function UserProtection() {
    const usuarios = useSelector( state => state.usuarios)
    const cargando = useSelector( state => state.usuarios.loading)

    if(cargando) return <main className='bg-emerald-700 text-center h-screen'>cargando</main> 
  

    return (
      <>
          {cargando ? (
              <main className='bg-emerald-700 text-center h-screen'>cargando</main>
          ) : (
              usuarios.isAuthenticated && usuarios?.user?.role === 'user' ? <UserLayout/> :  <Navigate to="/login" />
          )}
      </>
  );
}
