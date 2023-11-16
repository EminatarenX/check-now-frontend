
import { useEffect, useState } from "react"
import { obtenerHoraEntrada } from "../../helpers"
import socket from '../../helpers/socket'

// Redux
import { useSelector, useDispatch } from "react-redux"
import { obtenerDepartamentosAction, obtenerCategoriasAction, getChecksAdminAction, nuevoCheckSocket } from "../../actions/empresasAction"

export default function EntradasSalidas() {
  const dispatch = useDispatch()
  const [filtro, setFiltro] = useState({
    departamento: "todos",
    categoria: "todos",
    fecha: "",
  })
  const {departamentos, categorias, checks, loading} = useSelector( state => state.empresa)
  const [ filtrados, setFiltrados ] = useState([])
  const [entradas, setEntradas] = useState([
    {
      nombre: 'Emiliano',
      apellido: 'Gonzalez',
      fecha: '2023-11-13',
      departamento: 'contaduria',
      horaEntrada: '08:00',


    },
 
    
  ])
  const filtrarYOrdenarChecks = () => {

    let checksFiltrados = [...checks] 

    if( filtro.departamento && filtro.departamento !== 'todos'){
      checksFiltrados = checksFiltrados.filter(
        entrada => entrada.empleado.plaza.categoria.departamento._id === filtro.departamento
      )
    }

    if(filtro.categoria && filtro.categoria !== 'todos'){
      checksFiltrados = checksFiltrados.filter(
        entrada => entrada.empleado.plaza.categoria._id === filtro.categoria
      )
    }

    if(filtro.fecha.includes('-')){

      checksFiltrados = checksFiltrados.filter(
        entrada => {
          const fechaFiltro = new Date(filtro.fecha)
          const fechaCheck = new Date(entrada.fecha_entrada)
          const fechaFiltroFormateada = `${fechaFiltro.getFullYear()}-${fechaFiltro.getMonth() + 1}-${fechaFiltro.getDate()+1}`
          const fechaCheckFormateada = `${fechaCheck.getFullYear()}-${fechaCheck.getMonth() + 1}-${fechaCheck.getDate()}`
          if(fechaFiltroFormateada === fechaCheckFormateada){
            return entrada
          }
        }
      )
    }


    setFiltrados(checksFiltrados)
  }

  const fechaMaxima = () => {
    const fechaMax = new Date()
    fechaMax.setFullYear(fechaMax.getFullYear() )

    const fechaFormateada = fechaMax.toISOString().split('T')[0]
    return fechaFormateada
  }

  useEffect(()=> {
    dispatch(obtenerDepartamentosAction())
    dispatch(getChecksAdminAction())
  }, [])

  useEffect(() => {
    
    filtrarYOrdenarChecks()
    if(filtro.departamento !== 'todos'){
   
        dispatch(obtenerCategoriasAction(filtro.departamento))
        
      }
    
      
  }, [filtro, checks])

  useEffect(() => {
    socket.on('entrada recibida', (check) => {
    
      dispatch(nuevoCheckSocket(check))
    })
  })

  return (
    <main className="bg-emerald-950">
      <section className="bg-white rounded-tl-[100px] min-h-[500px]  p-14 lg:p-20">
        <h1 className="text-emerald-900 text-4xl font-semibold">Registro de entradas y salidas</h1>
        <p className="text-lg text-emerald-600 mt-2">Aqui podras ver todas las entradas y salidas de tus trabajadores</p>

          <nav className='flex items-center mt-10'>

            <ul className={`flex gap-5 w-full lg:flex-row flex-col`}>

            <select name="departamento" onChange={e => setFiltro({...filtro, departamento: e.target.value})}
              className='bg-transparent border-b-2 border-emerald-800 text-emerald-800 outline-none'
            >
              <option value="todos">DEPARTAMENTO ( TODOS )</option>

              {
                departamentos.length === 0 ? null :
                departamentos.map( (departamento,i) => (
                  <option key={i} className='uppercase' name={'departamento'} value={departamento._id} >{departamento.nombre.replace(/-/g, " ").toUpperCase()}</option>
                ))
              }
            </select>
            <select name="categoria" onChange={(e) => setFiltro({...filtro, categoria: e.target.value})}
              className='bg-transparent border-b-2 border-emerald-800 text-emerald-800 outline-none'
            >
              <option className="uppercase" value="todos">CATEGORIA / EQUIPO ( TODOS )</option>
              {
                categorias.length === 0 ? null :
                categorias.map ( categoria => (
                  <option className="uppercase" key={categoria._id} value={categoria._id}>{categoria.nombre}</option>
                ))
              }
            </select>
              <input
              type='date'
              name='fecha'
              max={fechaMaxima()}
              onChange={e => setFiltro({...filtro, fecha: e.target.value})}
              className='bg-transparent border-b-2 border-emerald-800 text-emerald-800 outline-none'/>
            </ul>
          </nav>

          <div className="overflow-x-scroll overflow-y-scroll lg:overflow-x-hidden min-h-[400px] max-h-[400px]">

          <table className='table-auto bg-white p-2 min-w-[800px] rounded gap-1 mt-5 w-full'>
          <thead className="sticky top-0 bg-white">
                    
                    <tr>
                      <th className="py-2 text-left border-b border-gray-400 text-emerald-900">
                        Nombre del trabajador
                      </th>
                      <th className="py-2 text-center border-b border-gray-400 text-emerald-900">
                        Departamento
                      </th>
                      <th className="py-2 text-center border-b border-gray-400 text-emerald-900">
                        Hora de Entrada
                      </th>
                      <th className="py-2 text-center border-b border-gray-400 text-emerald-900">
                        Hora de salida
                      </th>
                      <th className="py-2 text-center border-b border-gray-400 text-emerald-900">
                        Comentarios
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                      {
                          filtrados.length === 0 ? (
                              <tr>
                                  <td colSpan={5} className="py-2 text-left border-b border-gray-400 text-emerald-900">
                                      No hay entradas y salidas
                                  </td>
                              </tr>
                          ) : loading ? (
                            <tr>
                              <td colSpan={5}>Cargando</td>
                            </tr>
                          ) : (
                              filtrados.map((entrada,i) => (
                                  <tr className={`${(i+1) % 2 === 0 ? 'bg-white' : 'bg-neutral-100'} rounded w-full shadow animate-entrada border-b`} key={i}>
                                    <td className={"text-emerald-950 text-sm capitalize py-1"}>
                                          {entrada.empleado.usuario.nombre} {entrada.empleado.usuario.apellidos}
                                      </td>
                                      <td className="text-emerald-950 text-sm text-center">
                                          {entrada.empleado.plaza.categoria.departamento.nombre}
                                      </td>
                                      <td className="text-emerald-950 text-sm text-center">
                                          {obtenerHoraEntrada(entrada.fecha_entrada)}
                                      </td>
                                      <td className="text-emerald-950 text-sm text-center">
                                          {entrada.fecha_salida ? obtenerHoraEntrada(entrada.fecha_salida) : 'No registrada'}
                                      </td>
                                      <td className="text-emerald-950 text-sm text-center">
                                          {entrada.comentarios}
                                      </td>
                                  </tr>
                              )
                              )
                          )
                      }
                  </tbody>
          
        </table>

      </div>

      </section>
    </main>
  )
}
