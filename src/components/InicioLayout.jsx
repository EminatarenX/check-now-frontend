import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/img/Logo-header.svg'
import { useSelector } from 'react-redux';

export default function InicioLayout() {
  const [showMenu, setShowMenu] = useState(false);
  const cargando = useSelector( state => state.usuarios.loading)
  return cargando ? <main className='bg-emerald-700 text-center text-white h-screen'>cargando</main> :  (
    <>
        <header className='sticky top-0 bg-gradient-to-r from-emerald-800 to-emerald-500 flex justify-between items-center p-5'>
            <h1 className='text-white text-2xl font-bold'>
              <Link to={'/'}>
                <img src={logo} className='h-12' alt="logo" />
              </Link>
            </h1>
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className='text-white text-2xl lg:hidden z-10'>
              &#9776;
            </button>
            <nav className='hidden lg:block'>
              <ul className='flex gap-5'>
                <li className='text-white '>
                  <Link to={`/login` } className='border border-emerald-400 p-4 rounded hover:bg-emerald-500'>
                    Iniciar Sesion
                  </Link>
                </li>
                <li className='text-white '>
                  <Link to={`/registro`} className='border border-emerald-400 p-4 rounded hover:bg-emerald-500' >
                    Crear Cuenta
                  </Link>   
                </li>
              </ul>
            </nav>
            <nav 
              className={`lg:hidden fixed top-0 flex flex-col ${showMenu ? ' right-0' : ' right-[-400px]'} h-screen w-[250px] bg-emerald-900 transition-all justify-center gap-20`}
            >
              <Link to={'/login'} className='text-white text-2xl font-semibold w-full py-3 text-center hover:bg-emerald-950'>
                Iniciar Sesion
              </Link>
              <Link to={'/registro'} className='text-white text-2xl font-semibold w-full py-3 text-center hover:bg-emerald-950'>
                  Registrarse
              </Link>
            </nav>
        </header>
        <Outlet />

        <footer>
          <div className='bg-gradient-to-r from-emerald-800 to-emerald-500 flex justify-center items-center p-40'>
          <p className='text-white text-center'>
              &copy; Todos los derechos reservados <br /> - {new Date().getFullYear()} -
            </p>
          </div>
        </footer>
    </>
  )
}
