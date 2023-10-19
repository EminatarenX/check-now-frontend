import { useState } from "react"

import { useSelector, useDispatch } from "react-redux"
import { crearCategoriaAction } from "../../actions/empresasAction"
import { toast } from "react-toastify"


export default function NuevaCategoria({ setModal, departamento }) {
    const dispatch = useDispatch()
    const { departamento: departamento_id } = useSelector( state => state.helper)

    const [nombreCategoria, setNombreCategoria] = useState('')

    const submitCategoria = (e) => {
        e.preventDefault()
        if(nombreCategoria.length === 0) return toast.warning('El nombre de la categoria no puede estar vacio')
        dispatch(crearCategoriaAction({nombre: nombreCategoria, departamento:departamento_id}))
        setModal(false)
    }
    
    return (
        <div className='w-full fixed top-0 h-screen bg-emerald-950 bg-opacity-90 p-5 xl:p-20 z-10'>
            <div className='flex justify-end m-2 xl:m-0'>
                <button >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 xl:h-20 xl:w-20 text-emerald-900 hover:text-emerald-700 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="white" onClick={() => setModal(false)}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <form
                onSubmit={submitCategoria}
                className='bg-white rounded-2xl p-5 lg:p-10 flex flex-col animate-entrada'>
                <input type="text"
                    placeholder="Nombre de el equipo o categoría (ej: 'Administración de clientes, análisis y métricas, etc') "
                    className={`bg-transparent text-emerald-900  border-b-2 border-emerald-300 focus:outline-none p-3 placeholder:text-emerald-700  transition-all`}
                    name="nombre"
                    value={nombreCategoria}
                    onChange={e => setNombreCategoria(e.target.value)}
                />

                <input
                    type="submit"
                    value={'Agregar equipo'}
                    className="bg-emerald-900 text-white font-bold py-2 px-4 rounded mt-5 cursor-pointer hover:bg-emerald-700 transition-all"
                />
            </form>
        </div>
    )
}
