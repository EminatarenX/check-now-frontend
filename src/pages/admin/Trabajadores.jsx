import React, { useEffect, useState } from 'react'
import Trabajador from '../../components/admin/Trabajador'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { obtenerDepartamentosAction, obtenerEmpleadosAction, obtenerCategoriasAction } from '../../actions/empresasAction'

export default function Trabajadores() {
  const dispatch = useDispatch()
  const {departamentos, empleados} = useSelector( state => state.empresa)

  const [filtro, setFiltro ] = useState({departamento: '',categoria: '',empleado: ''})
  const [filtrados, setFiltrados ] = useState([])
  
  const filtrarYOrdenarTrabajadores = () => {
    let empleadosFiltrados = [...empleados]

    if(filtro.departamento && filtro.departamento !== 'todos'){
      
      empleadosFiltrados = empleadosFiltrados.filter(
        empleado => empleado.plaza.categoria.departamento.nombre === filtro.departamento
      )
    }

    if(filtro.categoria && filtro.categoria !== 'todos'){
      empleadosFiltrados = empleadosFiltrados.filter( empleado => 
        empleado.plaza.categoria.nombre === filtro.categoria  
      )
    }

    if(filtro.empleado) {
      empleadosFiltrados = empleadosFiltrados.filter( empleado => 
        empleado.usuario.nombre.toLowerCase().includes(filtro.empleado.toLowerCase())
      )
    }

    empleadosFiltrados.sort( (a, b) => a.usuario.nombre.localeCompare(b.usuario.nombre))
    setFiltrados(empleadosFiltrados)
  }

  useEffect(() => {
    filtrarYOrdenarTrabajadores()
    // dispatch(obtenerCategoriasAction())

  },[filtro])

  useEffect(() => {
    
    dispatch(obtenerEmpleadosAction())
      
  }
  ,[])

  return (
    <main className="bg-emerald-950">
      <section className="bg-white min-h-[500px] rounded-tl-[100px] rounded-br-[100px] p-10 lg:p-20">
        <h1 className="text-emerald-900 text-4xl font-semibold">Listado de trabajadores</h1>
        <p className="text-lg text-emerald-600 mt-2">Aqui podras ver todos los trabajadores de tu empresa y sus datos personales</p>

        <nav className='flex items-center mt-10'>

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
              onChange={e => setFiltro({...filtro, empleado: e.target.value})}
            />
           
          </ul>
        </nav>

        <article className='flex flex-col bg-slate-200 p-2 rounded overflow-y-auto max-h-[600px] gap-4 mt-5'>
          {
            filtrados.length === 0 ? (

                <p className='text-emerald-500 text-center'>No hay trabajadores</p>
            )  :  (

              filtrados.map(  (empleado) => (
                
                  <Trabajador key={empleado._id} empleado={empleado} />
              )) 
            )}
        </article>

      </section>

    </main>
  )
}
