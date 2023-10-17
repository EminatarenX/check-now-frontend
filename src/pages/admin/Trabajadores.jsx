import React, { useEffect, useState } from 'react'
import Trabajador from '../../components/admin/Trabajador'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { obtenerDepartamentosAction } from '../../actions/empresasAction'

export default function Trabajadores() {
  const dispatch = useDispatch()
  const departamentos = useSelector( state => state.empresa.departamentos)
  const [filtro, setFiltro ] = useState({
    departamento: '',
    categoria: '',
    trabajador: ''
  })
  const [filtrados, setFiltrados ] = useState([])

  const [trabajadores, setTrabajadores] = useState([
  {
      id: 1,
      nombre: 'Luiz daniel',
      email: 'luis@correo.com',
      fecha: '2021-09-01',
      departamento: 'redes', categoria: 'internet'
    },
    {
      id: 2,
      nombre: 'Emiliano Nataren',
      email: 'emi@correo.com',
      fecha: '2021-09-01',
      departamento: 'software', categoria: 'frontend'
    },
    {
      id: 3,
      nombre: 'Alberto Potasio',
      email: 'alberto@correo.com',
      fecha: '2021-09-01',
      departamento: 'software', categoria: 'backend'
    },
    {
      id: 4,
      nombre: 'Criis vim',
      email: 'cris@correo.com',
      fecha: '2021-09-01',
      departamento: 'redes', categoria: 'lan'
    },


  ])

  const filtrarYOrdenarTrabajadores = () => {
    let trabajadoresFiltrados = [...trabajadores]

    if(filtro.departamento && filtro.departamento !== 'todos'){
      trabajadoresFiltrados = trabajadoresFiltrados.filter(
        trabajador => trabajador.departamento === filtro.departamento
      )
    }

    if(filtro.categoria && filtro.categoria !== 'todos'){
      trabajadoresFiltrados = trabajadoresFiltrados.filter( trabajador => 
        trabajador.categoria === filtro.categoria  
      )
    }

    if(filtro.trabajador) {
      trabajadoresFiltrados = trabajadoresFiltrados.filter( trabajador => 
        trabajador.nombre.toLowerCase().includes(filtro.trabajador.toLowerCase())
      )
    }

    trabajadoresFiltrados.sort( (a, b) => a.nombre.localeCompare(b.nombre))
    setFiltrados(trabajadoresFiltrados)
  }

  useEffect(() => {
    filtrarYOrdenarTrabajadores()
  },[filtro])


  return (
    <main className="bg-emerald-950">
      <section className="bg-emerald-200 rounded-tl-[100px] rounded-br-[100px] p-10 lg:p-20">
        <h1 className="text-emerald-900 text-4xl font-semibold">Listado de trabajadores</h1>
        <p className="text-lg text-emerald-600 mt-2">Aqui podras ver todos los trabajadores de tu empresa y sus datos personales</p>

        <nav className='flex flex-column justify-between items-center gap-5 mt-10'>

          <ul className={`flex gap-5 w-full lg:flex-row flex-col`}>

            <select name="filtro"
            onChange={ e => setFiltro({...filtro, departamento: e.target.value})}
              className='bg-transparent border-b-2 border-emerald-800 text-emerald-800 outline-none'
            >
              <option value="todos">DEPARTAMENTO ( TODOS )</option>

              {
                departamentos.length === 0 ? null :
                departamentos.map( departamento => (
                  <option className='uppercase' value={departamento.nombre} >{departamento.nombre.replace(/-/g, " ").toUpperCase()}</option>
                ))
              }
            </select>
            <select name="categoria" onChange={ e => setFiltro({...filtro, categoria: e.target.value})}
              className='bg-transparent border-b-2 border-emerald-800 text-emerald-800 outline-none'
            >
              <option className="uppercase" value="todos">CATEGORIA / EQUIPO ( TODOS )</option>
              <option value="backend">BACKEND</option>
              <option value="frontend">FRONTEND</option>
              <option value="internet">INTERNET</option>
              <option value="lan">LAN</option>
            </select>
            <input type="text" placeholder='Buscar nombre' className='placeholder:text-emerald-500 bg-transparent border-b-2 border-emerald-800 text-emerald-800 outline-none'
              onChange={e => setFiltro({...filtro, trabajador: e.target.value})}
            />
           
          </ul>
        </nav>

        <article className='flex flex-col bg-emerald-950 rounded overflow-y-auto max-h-[600px] p-5 gap-4 mt-5'>
          {
            filtrados.length === 0 ? (

                <p className='text-emerald-500 text-center'>No hay trabajadores</p>
            )  :  (

              filtrados.map(  (trabajador, i) => (
                
                  <Trabajador key={i} trabajador={trabajador} />
              )) 
            )}
        </article>

      </section>

    </main>
  )
}
