import {useState} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function NewUserForm() {

  const [formulario, setFormulario] = useState({
    nombre: '',
    apellidos: '',
    role: '',

  })

  const cargando = useSelector(state  => state.usuarios.loading)
  const error = useSelector( state => state.usuarios.error)

  const handleRegistrar = (e) => {
    e.preventDefault()
  }


  return (
    <main className='bg-emerald-700'>
      <section className='flex justify-evenly p-5 lg:p-20 items-center flex-col lg:flex-row'>
        <h1 className='text-center text-white text-5xl font-bold'>Bienvenido a Check <span className='text--300'>Now!</span> <br /><span className='text-2xl text-emerald-200'>es un placer tenerte con nosotros</span></h1>
        <form 
            className='flex flex-col bg-emerald-900 p-5 rounded-lg shadow-2xl gap-5 w-3/4 lg:w-1/3 mt-5'
            onSubmit={handleRegistrar}
        >
            {
                cargando ? <p className="text-white text-center w-full py-2 rounded font-semibold bg-emerald-500">Cargando...</p> : null
            }
            {
                error ? <p className={`${error.classes}`}>{error.msg}</p> : null
            }
            
            <input type="text" 
                placeholder="Nombre"
                className={`bg-transparent text-white  border-b-2 border-emerald-300 focus:outline-none p-2 placeholder:text-white focus:scale-105 transition-all`}
  

            />
            
            <input type="text"
                placeholder="Apellidos"
                className={`bg-transparent text-white  border-b-2 border-emerald-300 focus:outline-none p-2 placeholder:text-white focus:scale-105 transition-all`}
      
            />
            
            <select className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded " name="" id="">
              <option value="">-- Seleccione una opcion ---</option>
              <option value="admin">Administrador, jefe o dueño de una empresa</option>
              <option value="user">Trabajador</option>
            </select>
            <input 
                className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded "
            type="submit" value="Registrar" 
            
            />

        </form>
      </section>
    </main>
  )
}
