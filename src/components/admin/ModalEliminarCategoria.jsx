import { useState } from "react"
import { toast } from "react-toastify"

//Redux
import { useDispatch } from "react-redux"
import { eliminarCategoriaDepartamentoAction } from "../../actions/empresasAction"

export default function ModalEliminarCategoria({ setModalEliminarCategoria, categorias }) {
    const dispatch = useDispatch()

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')

    const eliminarCategoria = e => {
        e.preventDefault()
        
        if (categoriaSeleccionada.length === 0) {
            return toast.warning('Selecciona una categoria')
        }
        dispatch(eliminarCategoriaDepartamentoAction(categoriaSeleccionada))
        setModalEliminarCategoria(false)
    }
    return (
        <div className='w-full fixed top-0 h-screen bg-emerald-950 bg-opacity-90 p-5 xl:p-20 z-10'>
            <div className='flex justify-end m-2 xl:m-0'>
                <button >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 xl:h-20 xl:w-20 text-emerald-900 hover:text-emerald-700 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="white" onClick={() => setModalEliminarCategoria(false)}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <form
                onSubmit={eliminarCategoria}
                className='bg-white rounded-2xl p-5 lg:p-10 flex flex-col animate-entrada'>
                {
                    categorias.length === 0 ? (
                        <p className='text-emerald-500 text-center'>No hay categorias</p>
                    ) : (
                        <select name="categoria"
                            id="categoria"
                            value={categoriaSeleccionada}
                            onChange={e => setCategoriaSeleccionada(e.target.value)}
                            className='bg-transparent text-emerald-900  border-b-2 border-emerald-300 focus:outline-none p-3 placeholder:text-emerald-700  transition-all'>
                            <option value="">Selecciona una categoria</option>
                            {
                                categorias.map(categoria => (
                                    <option key={categoria._id} value={categoria._id}>{categoria.nombre}</option>
                                ))
                            }
                        </select>
                    )
                }
                <input
                    type="submit"
                    value={'Eliminar categoria'}
                    className="bg-red-600 text-white font-bold py-2 px-4 rounded mt-5 cursor-pointer hover:bg-emerald-700 transition-all"
                />
            </form>
        </div>
    )
}
