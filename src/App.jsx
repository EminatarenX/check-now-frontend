import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {useNavigate, Routes, Route, useLocation } from 'react-router-dom'
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
import UserDashboard from './pages/user/UserDashboard'
import NewUsersRoute from './components/NewUsersRoute'
import NewUserForm from './pages/NewUserForm'

import UserProtection from './components/UserProtection'
// admin pages
import Dashboard from './pages/admin/Dashboard'
import Nominas from './pages/admin/Nominas'
import Trabajadores from './pages/admin/Trabajadores'
import AdminConfig from './pages/admin/AdminConfig'
import Solicitudes from './pages/admin/Solicitudes'
import EntradasSalidas from './pages/admin/EntradasSalidas'
import Departamentos from './pages/admin/Departamentos'
import Categoria from './pages/admin/Categoria'
import Plaza from './pages/admin/Plaza'
import Empleado from './pages/admin/Empleado'
import Plan from './pages/admin/Plan'

import { obtenerPerfilAction } from './actions/usuariosActions'
import UserConfig from './pages/user/UserConfig'
import PaymentSuccess from './pages/admin/PaymentSuccess'

function App() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const usuario = useSelector(state => state.usuarios?.user)

  
  useEffect(() => {
    const verificar = async() => {
      const token = localStorage.getItem('token')

      if(token) {
        dispatch(obtenerPerfilAction(token))

      }
    }
    if(location.pathname === '/login' || location.pathname.includes('/admin') || location.pathname.includes('/dashboard') || location.pathname.includes('/new-user') ){
      verificar()

    }

  },[])

  useEffect(()=> {
    const verificar = async() => {
      const token = localStorage.getItem('token')

      if(token) {
        dispatch(obtenerPerfilAction(token))

      }
    }
    if(location.pathname === '/login'){
      verificar()
    }

  },[location.pathname])

  useEffect(() => {

    // Observar cambios en el estado de usuario
    
      if (usuario) {

        if (usuario.role === 'admin') {
          navigate('/admin')
        } else if (usuario.role === 'user') {
          navigate('/dashboard')
        }else if(usuario.role === 'new') {
          navigate('/new-user')
        }else {
          navigate(`/`)
        }
      }
    
  }, [usuario])

  //otro cambio que podria generar problemas

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  



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
            <Route path='/payment-confirmation/:session' element={<PaymentSuccess/>} />
          </Route>

          <Route path='/admin' element={ <RutaProtegida />}>
            <Route index element={<Dashboard />} />
            <Route path='configuracion' element={<AdminConfig/>} />
            <Route path='departamentos' element={<Departamentos/>} />
            <Route path='nominas' element={<Nominas/>} />
            <Route path='trabajadores' element={<Trabajadores/>} />
            <Route path='solicitudes' element={<Solicitudes/>} />
            <Route path='entradas-salidas' element={<EntradasSalidas/>} />
            <Route path="departamentos/:departamento" element={<Categoria/>} />
            <Route path='departamentos/:departamento/:plaza' element={<Plaza/>} />
            <Route path='trabajadores/:empleado' element={<Empleado />} />
            <Route path='planes' element={<Plan/>} />
            
          </Route>

          <Route path='/dashboard' element={<UserProtection/>}>
            <Route index element={<UserDashboard />} />
            <Route path='settings' element={<UserConfig/>} />
          </Route>

          <Route path='/new-user' element={<NewUsersRoute/>}>
           <Route index element={<NewUserForm/>}/>
           
          </Route>
        </Routes>
        </>

  )
}

export default App
