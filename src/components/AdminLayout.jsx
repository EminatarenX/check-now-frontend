import {useEffect, useState} from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { formatearFecha } from '../helpers'
import '../styles/adminLayout.css'

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

  useEffect(()=> {

      const reloj = document.createElement('span')
      reloj.classList.add('reloj')
      reloj.innerHTML = `${fecha.getHours()} : ${fecha.getMinutes()}`
      
      

      document.addEventListener('scroll', () => {

        if(document.body.contains(reloj)){
          if(window.scrollY > 100) {
            reloj.classList.remove('reloj-out')
            reloj.classList.add('reloj-in') 

          } else {
            reloj.classList.remove('reloj-in')
            reloj.classList.add('reloj-out')
            
          }
        }else{
          document.body.appendChild(reloj)
        }
        
      })


  },[])

  return (
    <>
      <header className='bg-emerald-950 p-5 items-end lg:p-20 flex lg:items-start justify-between '>
      <div className=''>
      <h1 className='text-white text-4xl capitalize font-semibold'>{rutaActual === "/admin" ? 'dashboard' : rutaActual === '/admin/entradas-salidas' ? 'Entradas / salidas' : rutaActual.split('/')[2]}</h1>
     
      <p className="text-light text-emerald-200 text-xs mt-4">{formatearFecha(fecha.toISOString())}</p>
      </div>
      <p className='text-emerald-300 text-lg lg:text-2xl font-semibold'>
        {`${fecha.getHours()} : ${fecha.getMinutes()}  `}
        <span className='text-xs text-emerald-800'>
        {fecha.getHours() >= 12 ? 'pm': 'am'}
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
