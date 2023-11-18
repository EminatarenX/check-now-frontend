import {useState} from 'react'
import { toast } from 'react-toastify'

// Redux
import { useDispatch } from 'react-redux';
import { agregarPlazaAction } from '../../actions/empresasAction';

export default function NuevaPlaza({setModalPlaza, categorias}) {

  const dispatch = useDispatch()

  const [formularioPlaza, setFormularioPlaza] = useState({
    nombre: '',
    categoria: '',
    descripcion: '',
    habilidades: '',
    salario: '',
    horario_entrada: '',
    horario_salida: ''
  })

  const todosLosCamposEstanLlenos = () => {
    for (const key in formularioPlaza) {
      if (formularioPlaza.hasOwnProperty(key) && formularioPlaza[key].trim() === '') {
        return false;
      }
    }
    return true;
  };

  const crearPlaza = e => {
    e.preventDefault()

    if(!todosLosCamposEstanLlenos()) return toast.warning('Todos los campos son obligatorios')

    if(!Number(formularioPlaza.salario)){
      return toast.warning('El salario debe ser un numero')
    }

    if(Number(formularioPlaza.horario_entrada.split(':')[0]) > Number(formularioPlaza.horario_salida.split(':')[0])){
      return toast.warning('El horario de entrada no puede ser mayor al horario de salida')
    }

    
    dispatch(agregarPlazaAction(formularioPlaza))
    setModalPlaza(false)
    setFormularioPlaza({})
  }

  return (
    <div className='w-full fixed top-0 h-screen bg-emerald-950 bg-opacity-90 p-5 xl:p-20 z-10'>
    <div className='flex justify-end m-2 xl:m-0'>
    <button >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 xl:h-20 xl:w-20 text-emerald-900 hover:text-emerald-700 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="white" onClick={()=> setModalPlaza(false)}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
    </div>
    <form
        onSubmit={crearPlaza}
        className='bg-white rounded-2xl p-5 lg:p-10 flex flex-col animate-entrada'>
    <input type="text"
        placeholder="Nombre de la plaza o vacante (ej: 'Desarrollador web, diseñador gráfico, etc')"
        className={`bg-transparent text-emerald-900  border-b-2 border-emerald-300 focus:outline-none p-3 placeholder:text-emerald-700  transition-all`}
        value={formularioPlaza.nombre}
        onChange={e => setFormularioPlaza({ ...formularioPlaza, nombre: e.target.value })}
      />
      <select 
        placeholder="Nombre de el equipo o categoría (ej: 'Administración de clientes, análisis y métricas, etc') "
        className={`bg-transparent text-emerald-900  border-b-2 border-emerald-300 focus:outline-none p-3 placeholder:text-emerald-700  transition-all`}
        name="categoria" id="categoria-plaza"
        value={formularioPlaza.categoria}
        onChange={e => setFormularioPlaza({ ...formularioPlaza, categoria: e.target.value })}
        >
        <option value="">Selecciona una categoria</option>
        {
          categorias.map( categoria => (
            <option key={categoria._id} value={categoria._id}>{categoria.nombre.toUpperCase().replace(/-/g, " ")}</option>
          ))
        }
      </select>
          <input type="text"
        placeholder="Descripción de la plaza o vacante (Ocupaciones, obligaciones, etc)"
        value={formularioPlaza.descripcion}
        onChange={e => setFormularioPlaza({ ...formularioPlaza, descripcion: e.target.value })}
        className={`bg-transparent text-emerald-900  border-b-2 border-emerald-300 focus:outline-none p-3 placeholder:text-emerald-700  transition-all`}

      />
      <input type="text"
        placeholder="Requisitos de la plaza o vacante (Estudios, experiencia, etc)"
        value={formularioPlaza.habilidades}
        onChange={e => setFormularioPlaza({ ...formularioPlaza, habilidades: e.target.value })}
        className={`bg-transparent text-emerald-900  border-b-2 border-emerald-300 focus:outline-none p-3 placeholder:text-emerald-700  transition-all`}
      />
      
      <input type="text"
        placeholder="Sueldo diario (ej: 207.44 MXN)"
        value={formularioPlaza.salario}
        onChange={e => setFormularioPlaza({ ...formularioPlaza, salario: e.target.value })}
        className={`bg-transparent text-emerald-900  border-b-2 border-emerald-300 focus:outline-none p-3 placeholder:text-emerald-700  transition-all`}
      />
      <div className='flex flex-col lg:flex-row lg:justify-between gap-4 mt-5'>
     <div className='flex flex-col w-full'>
      <label 
        htmlFor="horario-entrada">Horario de entrada</label>
     <input type="time" 
        value={formularioPlaza.horario_entrada}
        onChange={e => setFormularioPlaza({ ...formularioPlaza, horario_entrada: e.target.value })}
        placeholder="Horario de la plaza o vacante (ej: 8:00 - 17:00)"
        className={`bg-transparent text-emerald-900  border-b-2 border-emerald-300 focus:outline-none p-3 placeholder:text-emerald-700  transition-all`}
      />
     </div>
       <div className='flex flex-col w-full'>
        <label htmlFor="horario-salida">Horario de salida</label>
       <input type="time"
        value={formularioPlaza.horario_salida}
        onChange={e => setFormularioPlaza({ ...formularioPlaza, horario_salida: e.target.value })}
        placeholder="Horario de la plaza o vacante (ej: 8:00 - 17:00)"
        className={`bg-transparent text-emerald-900  border-b-2 border-emerald-300 focus:outline-none p-3 placeholder:text-emerald-700  transition-all`}
      />
       </div>
      </div>

      <input 
      type="submit" 
        value={'Agregar plaza'}
        className="bg-emerald-900 text-white font-bold py-2 px-4 rounded mt-5 cursor-pointer hover:bg-emerald-700 transition-all"
      />
    </form>
</div>
  )
}
