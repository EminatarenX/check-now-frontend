import {useEffect, useState} from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { formatearFecha } from '../helpers'


export default function AdminLayout() {
  const [fecha, setFecha] = useState(new Date())


  const location = useLocation()
  const rutaActual = location.pathname

  useEffect(()=> {
    const interval = setInterval(()=> {
      setFecha(new Date())
    },1000)

    return () => clearInterval(interval)
  },[])
  return (
    <>
      <header className='bg-emerald-950 p-5 items-end lg:p-20 flex lg:items-start justify-between '>
      <div className=''>
      <h1 className='text-white text-4xl capitalize font-semibold'>{rutaActual === "/admin" ? 'dashboard' : rutaActual === '/admin/entradas-salidas' ? 'Entradas / salidas' : rutaActual.split('/')[2]}</h1>
     
      <p className="text-light text-emerald-200 text-xs mt-4">{formatearFecha(new Date().toISOString())}</p>
      </div>
      <p className='text-emerald-300 text-lg lg:text-2xl font-semibold'>
        {`${new Date().getHours()} : ${new Date().getMinutes()}  `}
        <span className='text-xs text-emerald-800'>
        {new Date().getHours() >= 12 ? 'pm': 'am'}
        </span>
      </p>
      </header>
    <Outlet />    
    <footer>
          <div className='bg-gradient-to-r from-emerald-950 to-emerald-900 flex justify-center items-center p-20 lg:p-40'>
            <p className='text-white text-center'>
              &copy; Todos los derechos reservados - {new Date().getFullYear()}
            </p>
          </div>
        </footer>
    </>
  )
}
