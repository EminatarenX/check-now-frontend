import React, { useState } from 'react'
import Trabajador from '../../components/admin/Trabajador'

export default function Trabajadores() {

  const [trabajadores, setTrabajadores] = useState([
    {
      id: 1,
      nombre: 'Juan Perez',
      email: 'juan@correo.com',
      fecha: '2021-09-01'
    },
    {
      id: 2,
      nombre: 'Juan Perez',
      email: 'juan@correo.com',
      fecha: '2021-09-01'
    },
    {
      id: 3,
      nombre: 'Juan Perez',
      email: 'juan@correo.com',
      fecha: '2021-09-01'
    },
    {
      id: 4,
      nombre: 'Juan Perez',
      email: 'juan@correo.com',
      fecha: '2021-09-01'
    },
    {
      id: 1,
      nombre: 'Juan Perez',
      email: 'juan@correo.com',
      fecha: '2021-09-01'
    },
    {
      id: 2,
      nombre: 'Juan Perez',
      email: 'juan@correo.com',
      fecha: '2021-09-01'
    },
    {
      id: 3,
      nombre: 'Juan Perez',
      email: 'juan@correo.com',
      fecha: '2021-09-01'
    },
    {
      id: 4,
      nombre: 'Juan Perez',
      email: 'juan@correo.com',
      fecha: '2021-09-01'
    },    {
      id: 1,
      nombre: 'Juan Perez',
      email: 'juan@correo.com',
      fecha: '2021-09-01'
    },
    {
      id: 2,
      nombre: 'Juan Perez',
      email: 'juan@correo.com',
      fecha: '2021-09-01'
    },
    {
      id: 3,
      nombre: 'Juan Perez',
      email: 'juan@correo.com',
      fecha: '2021-09-01'
    },
    {
      id: 4,
      nombre: 'Juan Perez',
      email: 'juan@correo.com',
      fecha: '2021-09-01'
    },


  ])


  return (
    <main className="bg-emerald-950">
      <section className="bg-emerald-200 rounded-tl-[100px] rounded-br-[100px] p-10 lg:p-20">
        <h1 className="text-emerald-900 text-4xl font-semibold">Listado de trabajadores</h1>
        <p className="text-lg text-emerald-600 mt-2">Aqui podras ver todos los trabajadores de tu empresa y sus datos personales</p>

        <nav className='flex flex-column justify-between items-center gap-5 mt-10'>

          <ul className={`flex gap-5`}>

            <select name="filtro" id=""
              className='bg-transparent border-b-2 border-emerald-800 text-emerald-800'
            >
              <option value="TODAS">TODAS</option>
            </select>
            <select
              className='bg-transparent border-b-2 border-emerald-800 text-emerald-800'
              name="fecha" id="">
              <option value="">FECHA</option>

            </select>
          </ul>
        </nav>

        <article className='flex flex-col bg-emerald-950 rounded overflow-y-auto max-h-[600px] p-5 gap-4 mt-5'>
          {
            trabajadores.length === 0 ? (

                <p className='text-emerald-500 text-center mt-5'>No hay trabajadores</p>

            ) : (
                trabajadores.map( trabajador  => (
                  <Trabajador 
                  key={trabajador.id}
                  trabajador={trabajador} 
                
                />
                )) 
            )
          }
        </article>

      </section>

    </main>
  )
}
