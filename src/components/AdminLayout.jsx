import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <>
        <header>
            admin
        </header>
    <Outlet />    
    <footer>
          <div className='bg-gradient-to-r from-emerald-800 to-emerald-500 flex justify-center items-center p-40'>
            <p className='text-white text-center'>
              &copy; Todos los derechos reservados - {new Date().getFullYear()}
            </p>
          </div>
        </footer>
    </>
  )
}
