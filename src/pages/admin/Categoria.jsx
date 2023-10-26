import { useState, Fragment, useEffect } from "react"
import { useParams } from "react-router-dom"
import NuevaCategoria from "../../components/admin/NuevaCategoria"
import NuevaPlaza from "../../components/admin/NuevaPlaza"
import ModalEliminarCategoria from "../../components/admin/ModalEliminarCategoria"

import { useSelector, useDispatch } from "react-redux"
import { obtenerCategoriasAction, obtenerPlazasAction } from "../../actions/empresasAction"
import Plaza from "../../components/admin/Plaza"
import Regresar from "../../components/admin/Regresar"

export default function Categoria() {
  const dispatch = useDispatch()
  const { categorias, plazas, loading } = useSelector(state => state.empresa)
  const { departamento: departamento_id} = useSelector(state => state.helper)

  const { departamento } = useParams()
  const departamentoCapitalizado = departamento.charAt(0).toUpperCase() + departamento.slice(1).replace(/-/g, ' ')

  const [modal, setModal] = useState(false)
  const [modalPlaza, setModalPlaza] = useState(false)
  const [modalEliminarCategoria, setModalEliminarCategoria] = useState(false)
  const [categoria, setCategoria] = useState('todas')
 
  

  useEffect(() => {
    dispatch(obtenerCategoriasAction(departamento_id))
    
  }, [])

  useEffect(()=> {
    if(categoria !== "todas"){
      dispatch(obtenerPlazasAction(categoria))
    }


  },[categoria])


  return (
    <Fragment>
      {modal && <NuevaCategoria setModal={setModal} departamento={departamento} />}
      {modalPlaza && <NuevaPlaza setModalPlaza={setModalPlaza} categorias={categorias} />}
      {modalEliminarCategoria && <ModalEliminarCategoria setModalEliminarCategoria={setModalEliminarCategoria} categorias={categorias} />}
      <main className='bg-emerald-950'>


        <section className='bg-emerald-200 rounded-tl-[100px] p-10 lg:p-20'>


          <h1 className='text-4xl text-emerald-900 font-semibold'>{departamentoCapitalizado} </h1>
          <p className='text-emerald-600 text-lg'>Aqui podras ver las plazas o vacantes de {departamentoCapitalizado}</p>
          <Regresar/>

          <nav className="flex items-center mt-10">
            <ul className="flex gap-5 w-full lg:flex-row flex-col lg:justify-between">
              <div className="flex gap-5 lg:flex-row flex-col">
                <select name="categoria" onChange={e => setCategoria(e.target.value)}
                  className='bg-transparent border-b-2 border-emerald-800 text-emerald-800 outline-none'

                >
                  <option value="todas">-- Seleccione una categoria --</option>
                  {
                    categorias.map(categoria => (
                      <option key={categoria._id} value={categoria._id}>{categoria.nombre.toUpperCase().replace(/-/g, " ")}</option>
                    ))
                  }


                </select>
                <button
                  type="button"
                  onClick={() => {
                    setModalPlaza(false)
                    setModalEliminarCategoria(false)
                    setModal(true)
                  }}
                  disabled={loading ? true : false}
                  className={`${loading ? 'bg-emerald-950' : 'bg-emerald-800'} text-white px-3 py-2 rounded flex items-center gap-2 justify-between`}
                >
                  Agregar categoria
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                {
                  categorias.length > 0 && (

                    <button
                      onClick={() => {
                        setModal(false)
                        setModalEliminarCategoria(false)
                        setModalPlaza(true)
                      }}
                      type="button"
                      disabled={loading ? true : categorias.length === 0 ? true : false}
                      className={`${loading ? 'bg-emerald-950 opacity-70' : categorias.length === 0 ? 'bg-emerald-950 opacity-70' : 'bg-emerald-800'} text-white px-3 py-2 rounded flex items-center gap-2 justify-between`}>
                      Agregar plaza
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  )
                }
              </div>
              {
                categorias.length > 0 && (

                  <button
                    onClick={() => {
                      setModal(false)
                      setModalPlaza(false)
                      setModalEliminarCategoria(true)
                    }}
                    type="button"
                    disabled={loading ? true : false}
                    className={`${loading ? 'bg-red-800 opacity-70' : 'bg-red-600'} text-white px-3 py-2 rounded flex items-center gap-2 justify-between`}>
                    Eliminar categoria
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>

                  </button>
                )
              }

            </ul>

          </nav>


          <article
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5 gap-5"
          >
            {
              plazas.length === 0 || categoria === 'todas' ? (
                <p className='text-emerald-500 text-center lg:col-span-4 mt-10'>No hay plazas</p>
              ) : (
                
                plazas.map( plaza => (
                 <Plaza
                  key={plaza._id}
                  plaza={plaza}
                 />
                ))
              )
            }

          </article>




        </section>
      </main>
    </Fragment>
  )
}
