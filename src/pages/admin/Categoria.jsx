import { useState, Fragment } from "react"
import { useParams } from "react-router-dom"
import NuevaCategoria from "../../components/admin/NuevaCategoria"
import NuevaPlaza from "../../components/admin/NuevaPlaza"


export default function Categoria() {

  const { departamento } = useParams()
  const departamentoCapitalizado = departamento.charAt(0).toUpperCase() + departamento.slice(1).replace(/-/g, ' ')

  const [modal, setModal] = useState(false)
  const [ modalPlaza, setModalPlaza ] = useState(false)
  const [categoria, setCategoria] = useState('todas')

  return (
    <Fragment>
      {modal && <NuevaCategoria setModal={setModal} departamento={departamento} />}
      {modalPlaza && <NuevaPlaza setModalPlaza = {setModalPlaza} />}
      <main className='bg-emerald-950'>


        <section className='bg-emerald-200 rounded-tl-[100px] p-14 lg:p-20'>


          <h1 className='text-4xl text-emerald-900 font-semibold'>{departamentoCapitalizado} </h1>
          <p className='text-emerald-600 text-lg'>Aqui podras ver las plazas o vacantes de {departamentoCapitalizado}</p>

          <nav className="flex items-center mt-10">
            <ul className="flex gap-5 w-full lg:flex-row flex-col">
              <select name="categoria" onChange={e => setCategoria(e.target.value)}
                className='bg-transparent border-b-2 border-emerald-800 text-emerald-800 outline-none'

              >
                <option value="todas"> CATEGORIA ( TODAS )</option>
                <option value="software"> SOFTWARE</option>


              </select>
              <button
                type="button"
                onClick={() => {
                  setModalPlaza(false)
                  setModal(true)
                }}
                className='bg-emerald-800 text-white px-3 py-2 rounded flex items-center gap-2'
              >
                {categoria !== 'todas' && 'Agregar categoria'}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              {
                categoria !== 'todas' && (
                  <button 
                  onClick={() => {
                    setModal(false)
                    setModalPlaza(true)
                  }}
                  className='bg-emerald-800 text-white px-3 py-2 rounded flex items-center gap-2'>
                    Agregar plaza
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                )
              }
            </ul>

          </nav>


          <article
            className="grid lg:grid-cols-3 rounded p-5 gap-4 mt-5"
          >
            {
              !true ? (
                <p className='text-emerald-500 text-center'>No hay plazas</p>
              ) : (
                <div className='bg-white shadow-lg p-3 rounded flex gap-5'>
                  <img className='w-20 h-20 rounded-full object-cover'
                    src="https://th.bing.com/th/id/R.abb5e2f3a89fe5f1871d9e13555a4cfb?rik=Gw6033iUygmZPQ&riu=http%3a%2f%2fcdn.marketing4ecommerce.net%2fwp-content%2fuploads%2f2017%2f01%2f02204956%2fqu%c3%a9-es-una-imagen-vectorial.jpg&ehk=HTmTsIAUN71R1e1kAp3MB6q0dm57GQVLk2TwmRfmuds%3d&risl=&pid=ImgRaw&r=0" alt="imagen-carro" />
                  <div>
                    <p>Nombre</p>
                    <p>Plaza</p>
                    <p>Fecha</p>
                  </div>

                </div>
              )
            }

          </article>




        </section>
      </main>
    </Fragment>
  )
}
