import React from 'react'
import { Outlet } from 'react-router-dom'

export default function NewUsersLayout() {

  const cerrarSesion = () => {
    localStorage.removeItem('token')

    window.location.reload(false)
  }
  return (
    <>
    <header className='bg-emerald-700 flex justify-end p-3 '>
        <button
          onClick={cerrarSesion} 
          type='button' className=' p-3 bg-emerald-800 rounded shadow text-white font-semibold hover:scale-105 hover:bg-emerald-700 transition-all'>
          Cerrar sesion
        </button>
    </header>
    <Outlet/>
    <footer>
          <div className='bg-emerald-700 flex justify-center items-center p-32'>
            <p className='text-white text-center'>
              &copy; Todos los derechos reservados <br /> - {new Date().getFullYear()} -
            </p>
          </div>
        </footer>
    </>
  )
}
