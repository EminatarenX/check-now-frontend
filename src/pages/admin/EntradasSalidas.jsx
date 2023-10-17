
import { useEffect, useState } from "react"
import Entrada from "../../components/admin/Entrada"

// Redux
import { useSelector, useDispatch } from "react-redux"
import { obtenerDepartamentosAction } from "../../actions/empresasAction"

export default function EntradasSalidas() {
  const dispatch = useDispatch()
  const [filtro, setFiltro] = useState({
    departamento: "",
    categoria: "",
    fecha: '',
  })
  const departamentos = useSelector( state => state.empresa.departamentos)
  const [ filtrados, setFiltrados ] = useState([])
  const [entradas, setEntradas] = useState([
    {
      nombre: 'Emiliano',
      apellido: 'Gonzalez',
      fecha: '2021-10-01',
      departamento: 'contaduria',
      horaEntrada: '08:00',


    },
    {
      nombre: 'Emiliano',
      apellido: 'Gonzalez',
      fecha: '2021-10-01',
      departamento: 'contaduria',
      horaEntrada: '08:00',


    },
    {
      nombre: 'Emiliano',
      apellido: 'Gonzalez',
      fecha: '2021-10-01',
      plaza: 'Contador',
      horaEntrada: '08:00',


    },
    {
      nombre: 'Emiliano',
      apellido: 'Gonzalez',
      fecha: '2021-10-01',
      plaza: 'Contador',
      horaEntrada: '08:00',


    },
  ])
  const filtrarYOrdenarChecks = () => {
    let checksFiltrados = [...entradas] 

    if( filtro.departamento && filtro.departamento !== 'todos'){
      checksFiltrados = checksFiltrados.filter(
        entrada => entrada.departamento === filtro.departamento
      )
    }

    if(filtro.categoria && filtro.categoria !== 'todos'){
      checksFiltrados = checksFiltrados.filter(
        entrada => entrada.categoria === filtro.categoria
      )
    }

    if(filtro.fecha){
      checksFiltrados = checksFiltrados.filter(
        entrada => entrada.fecha === filtro.fecha
      )
    }

    checksFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre))

    setFiltrados(checksFiltrados)
  }
  useEffect(()=> {
    dispatch(obtenerDepartamentosAction())
  }, [])

  useEffect(() => {
    
    filtrarYOrdenarChecks()

  }, [filtro])

  return (
    <main className="bg-emerald-950">
      <section className="bg-emerald-200 rounded-tl-[100px] rounded-br-[100px] p-14 lg:p-20">
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
                departamentos.map( departamento => (
                  <option className='uppercase' value={departamento.nombre} >{departamento.nombre.replace(/-/g, " ").toUpperCase()}</option>
                ))
              }
            </select>
            <select name="categoria" onChange={(e) => setFiltro({...filtro, categoria: e.target.value})}
              className='bg-transparent border-b-2 border-emerald-800 text-emerald-800 outline-none'
            >
              <option className="uppercase" value="todos">CATEGORIA / EQUIPO ( TODOS )</option>

            </select>
              <input
              type='date'
              onChange={e => setFiltro({...filtro, fecha: e.target.value})}
              className='bg-transparent border-b-2 border-emerald-800 text-emerald-800 outline-none'/>
            </ul>
          </nav>


          <article className='flex flex-col bg-emerald-950 rounded overflow-y-auto max-h-[600px] p-5 gap-4 mt-5'>
          {
            filtrados.length === 0 ? (

                <p className='text-emerald-500 text-center'>No hay registros</p>
            )  :  (

              filtrados.map(  (entrada, i) => (
                
                  <Entrada key={i} entrada={entrada} />
              )) 
            )}
        </article>


      </section>
    </main>
  )
}
