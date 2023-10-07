import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {useNavigate, Routes, Route } from 'react-router-dom'
import Registrar from './pages/Registrar'
import Inicio from './pages/Inicio'
import InicioLayout from './components/InicioLayout'
import IniciarSesion from './pages/IniciarSesion'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import CambiarContrasenia from './pages/CambiarContrasenia'
import RecoveryPassword from './pages/RecoveryPassword'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import RutaProtegida from './components/RutaProtegida'
import Dashboard from './pages/admin/Dashboard'
import UserDashboard from './pages/user/UserDashboard'
import NewUsersRoute from './components/NewUsersRoute'
import NewUserForm from './pages/NewUserForm'

import UserProtection from './components/UserProtection'
import AdminConfig from './pages/admin/AdminConfig'
import { obtenerPerfilAction } from './actions/usuariosActions'

function App() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const usuario = useSelector(state => state.usuarios?.user)
  const auth = useSelector(state => state.usuarios.isAuthenticated)

  useEffect(() => {
    const verificar = async() => {
      const token = localStorage.getItem('token')

      if(token) {
        dispatch(obtenerPerfilAction(token))

      }
    
    }

    verificar()

  },[])


  useEffect(() => {
    // Observar cambios en el estado de usuario
    if (usuario) {

      if (usuario.role === 'admin') {
        navigate('/admin')
      } else if (usuario.role === 'user') {
        navigate('/dashboard')
      }else if(auth && !usuario.role) {
        navigate('/new-user')
      }else {
        navigate('/')
      }
    }
  }, [usuario])



  return (

    <>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<InicioLayout />}>
            <Route index element={<Inicio/>} />
            <Route path='/registro' element={<Registrar/>} />
            <Route path='/login' element={<IniciarSesion/>} />
            <Route path='/confirmar/:token' element={<ConfirmarCuenta/>} />
            <Route path='/cambiar-password' element={<CambiarContrasenia/>} />
            <Route path='/recovery/:token' element={<RecoveryPassword/>} />
          </Route>

          <Route path='/admin' element={ <RutaProtegida />}>
            <Route index element={<Dashboard />} />
            <Route path='configuracion' element={<AdminConfig/>} />
          </Route>

          <Route path='/dashboard' element={<UserProtection/>}>
            <Route index element={<UserDashboard />} />
          </Route>

          <Route path='/new-user' element={<NewUsersRoute/>}>
           <Route index element={<NewUserForm/>}/>
          </Route>
        </Routes>
        </>

  )
}

export default App
