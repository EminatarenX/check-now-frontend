
import { useState } from "react"
import { toast } from "react-toastify"

// Redux
import { useDispatch } from "react-redux"
import { crearDepartamentoAction, editarDepartamentoAction } from "../../actions/empresasAction"


export default function FormularioDepartamento({iconoDepartamento, 
    setIconoDepartamento, 
    nombreDepartamento, 
    setNombreDepartamento ,
    setFormularioDepartamento, 
    iconosDepartamentos, 
    editarDepartamento,
    departamentoId,
    setEditarDepartamento
}) {

    const dispatch = useDispatch()

    const handleCrearDepartamento = (e) => {
        e.preventDefault()

        if([nombreDepartamento, iconoDepartamento].includes('')) {
            toast.error('Todos los campos son obligatorios')
            return
        }
       
        const departamento = {
            nombre: nombreDepartamento,
            icon: iconoDepartamento
        }
        dispatch(crearDepartamentoAction(departamento))
        setNombreDepartamento('')
        setIconoDepartamento('')
        setFormularioDepartamento(false)
    }

    const handleEditarDepartamento = (e) => {
        e.preventDefault()

        if([nombreDepartamento, iconoDepartamento].includes('')) {
            toast.error('Todos los campos son obligatorios')
            return
        }
       
        const departamento = {
            nombre: nombreDepartamento,
            icon: iconoDepartamento
        }

        dispatch(editarDepartamentoAction({departamento, id: departamentoId}))
        setFormularioDepartamento(false)
        setEditarDepartamento(false)
        
    }



   



  return (
    <div className='w-full fixed top-0 h-screen bg-emerald-950 bg-opacity-90 p-5 xl:p-20 z-10'>
        <div className='flex justify-end m-2 xl:m-0'>
        <button >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 xl:h-20 xl:w-20 text-emerald-900 hover:text-emerald-700 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="white" onClick={()=> setFormularioDepartamento(false)}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        </div>
        <form
            onSubmit={ (e) => {
                editarDepartamento ? handleEditarDepartamento(e) :
                handleCrearDepartamento(e)
            }} 
            className='bg-white rounded-2xl p-5 lg:p-10 flex flex-col animate-entrada'>
        <input type="text"
            placeholder="Nombre o titulo del departamento (ej: 'Ventas, Marketing, etc') "
            className={`bg-transparent text-emerald-900  border-b-2 border-emerald-300 focus:outline-none p-3 placeholder:text-emerald-700  transition-all`}
            value={nombreDepartamento}
            name="nombre"
            onChange={(e) => setNombreDepartamento(e.target.value)}
          />

        <p className='text-emerald-800 text-lg mt-5 pl-4'>Icono del departamento</p>

        <div className='mt-4 grid grid-cols-4 lg:grid-cols-8 gap-5 justify-between overflow-y-scroll max-h-[250px]'> 
            {
                iconosDepartamentos.map( (icono, i) => (
                    <button 
                        onClick={() => setIconoDepartamento(icono.nombre)}
                        type="button"
                        key={i} className={`flex flex-col items-center gap-2 active:bg-emerald-200 hover:bg-emerald-100 ${iconoDepartamento === icono.nombre && 'bg-emerald-200' } rounded`}>
                        {icono.icon()}
                    </button>
                ))
            }

        </div>

     
          <input 
          type="submit" 
          value={`${editarDepartamento ? 'Guardar cambios' : 'Agregar departamento' }`} 
            className="bg-emerald-900 text-white font-bold py-2 px-4 rounded mt-5 cursor-pointer hover:bg-emerald-700 transition-all"
          />
        </form>
    </div>
  )
}
