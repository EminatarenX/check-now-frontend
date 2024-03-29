import { useEffect, useState } from 'react'
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom'
import '../styles/adminLayout.css'
import Reloj from './Reloj'
import Loader from './loaders/loader'
import { useSelector } from 'react-redux'

export default function AdminLayout() {
  const [fecha, setFecha] = useState(new Date())
  const { loading } = useSelector(state => state.empresa)
  const { user } = useSelector(state => state.usuarios)
  const navigate = useNavigate()
  const location = useLocation()
  const rutaActual = location.pathname

  useEffect(() => {

    const interval = setInterval(() => {
      setFecha(new Date())
    }, 1000)

    return () => clearInterval(interval)

  }, [])


  return (
    <>

    {
     !(user?.payment?.payment_status === "active" || user?.payment?.payment_status === 'paid') && rutaActual !== '/admin/planes' ? ( 
        <div className='bg-emerald-950 p-5 h-screen flex fixed w-full z-10 justify-center items-center bg-opacity-80'>
          <section className='bg-white rounded-[20px] p-10 lg:py-10 lg:px:20'>
            <h1 className='text-4xl text-emerald-900 font-semibold'>Pago pendiente</h1>
            <p className='text-emerald-900 text-lg'>Para poder acceder a la plataforma debe realizar el pago correspondiente</p>
            <Link to='/admin/planes' className='bg-emerald-900 text-white rounded-xl px-10 py-3 mt-5 block text-center'>Realizar pago</Link>
            <button
              onClick={() => {
                localStorage.removeItem('token')
                navigate('/login')
              }}
              className='bg-emerald-900 text-white rounded-xl px-10 py-3 mt-5 block text-center w-full'
            >
              Cerrar sesion
            </button>
          </section>
        </div>

      ) : null
    }

    {
      loading && (
        <Loader/>
      )
    }

      <Reloj reloj={fecha} />
      <header className='bg-emerald-950 p-5 items-end lg:p-5 flex lg:items-start justify-between relative'>
        <div className='mb-0 lg:mb-8'>
          <h1 className='text-white text-4xl capitalize font-semibold'>{rutaActual === "/admin" ? 'dashboard' : rutaActual === '/admin/entradas-salidas' ? 'Entradas / salidas' : rutaActual.split('/')[2]}</h1>

          {/* <p className="text-light text-emerald-200 text-xs mt-4">{formatearFecha(fecha.toISOString())}</p> */}
        </div>
        <p className='text-white text-lg lg:text-2xl font-semibold'>

          {`${fecha.getHours() > 12 ?
              fecha.getHours() - 12 : fecha.getHours()
            } : 
        ${fecha.getMinutes() < 10 ?
              '0' + fecha.getMinutes() :
              fecha.getMinutes()}  `
          }
          <span className='text-xs text-emerald-100'>
            {fecha.getHours() >= 12 ? 'pm' : 'am'}
          </span>
        </p>
        <nav className={`absolute ${rutaActual === "/admin" ? 'hidden': rutaActual === "/admin/planes" ? "hidden" : 'lg:flex'} bottom-0 hidden lg:left-32 justify-center animate-entrada`}>
          <Link className={` bg-white rounded-t-2xl text-emerald-900 font-medium p-2 text-sm`} to={'/admin'}>Inicio</Link>
          <Link className={`${rutaActual === '/admin/departamentos' ? 'bg-emerald-600 text-emerald-100' : 'bg-white text-emerald-900'}  rounded-t-2xl font-medium p-2 text-sm`} to={'/admin/departamentos'}>Departamentos</Link>
          <Link className={`${rutaActual === '/admin/nominas' ? 'bg-emerald-600 text-emerald-100' : 'bg-white text-emerald-900'}  rounded-t-2xl  font-medium p-2 text-sm`} to={'/admin/nominas'}>Nominas</Link>
          <Link className={`${rutaActual === '/admin/entradas-salidas' ? 'bg-emerald-600 text-emerald-100' : 'bg-white text-emerald-900'}  rounded-t-2xl font-medium p-2 text-sm`} to={'/admin/entradas-salidas'}>Entradas / Salidas</Link>
          <Link className={`${rutaActual === '/admin/trabajadores' ? 'bg-emerald-600 text-emerald-100' : 'bg-white text-emerald-900'} rounded-t-2xl font-medium p-2 text-sm`} to={'/admin/trabajadores'}>Trabajadores</Link>
          <Link className={`${rutaActual === '/admin/solicitudes' ? 'bg-emerald-600 text-emerald-100' : 'bg-white text-emerald-900'}  rounded-t-2xl  font-medium p-2 text-sm`} to={'/admin/solicitudes'}>Solicitudes</Link>
        </nav>
        {/* <button
          onClick={() => {
            navigate(-1)
          }} 
          className={`fixed ${rutaActual === "/admin" && 'hidden'} z-[1] top-[115px] right-2 lg:hidden  bg-emerald-800 rounded-full p-6 animate-entrada`}>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>

        </button> */}
      </header>
      <Outlet />
      <footer>
        <div className='bg-gradient-to-r from-emerald-950 to-emerald-900 flex justify-center items-center p-20 lg:p-40 '>
          <p className='text-white text-center'>
            &copy; Todos los derechos reservados - {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  )
}
