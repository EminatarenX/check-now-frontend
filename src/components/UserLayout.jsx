import { Outlet, useLocation, Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import logo from '../assets/img/Logo-header.svg'
// Redux
import { cerrarSesionAction } from "../actions/usuariosActions"
import { useDispatch } from "react-redux"

export default function UserLayout() {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // States
  const [ aside, setAside] = useState(false)

  const cerrarSesion = (e) => {
    e.preventDefault()

    dispatch(cerrarSesionAction())
    navigate('/login')

  }

  return (
    <>
      <aside 
        className={`fixed  top-0 ${aside ? 'left-0' : '-left-[1000px]'} transition-all duration-700 h-screen w-full bg-emerald-900  flex flex-col lg:hidden items-center gap-10 justify-center p-5 z-10`}
      >
              <button>
                
              </button>
              <Link to={'/dashboard'}
                onClick={() => setAside(false)}
              >
                <img src={logo} className='h-12' alt="logo" />
              </Link>
              <Link 
                to={'/dashboard'} 
                className="text-white text-lg hover:scale-105 transition-transform"
                onClick={() => setAside(false)}
                
                >
                
                Inicio
              </Link>
              <Link className="text-white text-lg hover:scale-105 transition-transform" to={'/dashboard/settings'}
                onClick={() => setAside(false)}

              >
                Configuración
              </Link>
              <button className="text-white text-lg hover:scale-105 transition-transform" onClick={() => { 
                  setAside(false)
                  cerrarSesion
                }}>
                Cerrar Sesión
              </button>
         
        
      </aside>
      <header className="flex lg:hidden bg-emerald-800 p-3 ">
        <button className="text-white text-2xl z-10"
          onClick={() => {
            setAside(!aside)
          }}
        >
          &#9776;
        </button>
      </header>
      <main className="flex">

        <aside className="w-1/5 bg-emerald-800 h-screen hidden lg:flex flex-col gap-10 p-5 ">
          <h1 className="text-emerald-100 text-4xl capitalize">
            {location.pathname === "/dashboard" ? 
            "Bienvenido" : location.pathname === '/dashboard/settings' ? 
            'Configuración' : location.pathname.split('/')[1]}</h1>
          <Link to={'/dashboard'} className="relative group text-start text-emerald-100 capitalize text-xl overflow-hidden">
            Inicio
            <span className="absolute inset-x-0 w-0 bottom-0 h-0.5 bg-white group-hover:w-full transition-all"></span>
          </Link>
          <Link to={'/dashboard/settings'} className="relative group text-start text-emerald-100 capitalize text-xl overflow-hidden">
            Configuración
            <span className="absolute inset-x-0 w-0 bottom-0 h-0.5 bg-white group-hover:w-full transition-all"></span>
          </Link>
          <button 
            onClick={cerrarSesion}
            className="relative group text-start text-emerald-100 capitalize text-xl overflow-hidden">
            Cerrar sesion
            <span className="absolute inset-x-0 w-0 bottom-0 h-0.5 bg-white group-hover:w-full transition-all"></span>
          </button>

        </aside>
        <main className="w-full lg:w-4/5 bg-white-500 p-5 bg-slate-200 lg:overflow-y-scroll lg:max-h-[850px]">

          <Outlet />
        </main>
      </main>

    </>
  )
}
