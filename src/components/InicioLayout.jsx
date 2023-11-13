import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/img/Logo-header.svg'

export default function InicioLayout() {
  const [showMenu, setShowMenu] = useState(false);

  const handleCerrarNavbar = (e) => {
    if(e.target.closest('.aside')) {
      setShowMenu(false)
    }
  }
  return  (
    <div onClick={handleCerrarNavbar}>
        <header className='sticky top-0 bg-gradient-to-r from-emerald-800 to-emerald-500 flex justify-between items-center p-5 z-10'>
            <h1 className='text-white text-2xl font-bold'>
              <Link to={'/'}>
                <img src={logo} className='h-12' alt="logo" />
              </Link>
            </h1>
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className='text-white text-2xl lg:hidden z-20'>
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
              className={`aside lg:hidden fixed top-0 flex flex-col ${showMenu ? ' right-0' : ' right-[-400px]'} h-screen w-[250px] bg-emerald-900 transition-all justify-center gap-20 z-10`}
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

        <footer className='bg-gradient-to-r from-emerald-800 to-emerald-500'>
  <div className='container mx-auto flex flex-col lg:flex-row justify-between items-center px-8 lg:px-16 py-40'>
    
    {/* Sección de Derechos de Autor */}
    <div className='text-white text-center mb-4 lg:mb-0'>
      <p>&copy; Todos los derechos reservados - {new Date().getFullYear()} -</p>
    </div>

    {/* Sección de Enlaces */}
    <div className='flex flex-wrap justify-center space-x-4 lg:space-x-8'>
      <a href='#' className='text-white hover:text-emerald-300 transition duration-300'>Inicio</a>
      <a href='#' className='text-white hover:text-emerald-300 transition duration-300'>Productos</a>
      <a href='#' className='text-white hover:text-emerald-300 transition duration-300'>Acerca de nosotros</a>
      <a href='#' className='text-white hover:text-emerald-300 transition duration-300'>Blog</a>
    </div>

    {/* Sección de Ayuda y Contacto */}
    <div className='text-white text-center'>
      <p className='mb-2'>¿Necesitas ayuda?</p>
      <a href='#' className='text-emerald-300 hover:underline transition duration-300'>Ayuda</a>
      <span className='mx-2'>|</span>
      <a href='#' className='text-emerald-300 hover:underline transition duration-300'>Contacto</a>
    </div>

  </div>
</footer>

    </div>
  )
}
