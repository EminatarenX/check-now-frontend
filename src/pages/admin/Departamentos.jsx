import { useState, Fragment } from 'react'
import FormularioDepartamento from '../../components/admin/FormularioDepartamento'
import { useNavigate } from 'react-router-dom'

export default function Departamentos() {
    const navigate = useNavigate()

    const [departamentos, setDepartamentos] = useState([
        {nombre: 'contabilidad',},
        {nombre: 'software',},
        {nombre: 'recursos-humanos',},
        {nombre: 'ventas',}
    ])
    const [ formularioDepartamento, setFormularioDepartamento ] = useState(false)
  return (
    <Fragment>
        {formularioDepartamento && <FormularioDepartamento setFormularioDepartamento={setFormularioDepartamento} />}
   
    <main className="bg-emerald-950">
        <section className="bg-emerald-200 rounded-tl-[100px] rounded-br-[100px] p-14 lg:p-20">
          {/* <h1 className="text-emerald-900 text-4xl font-semibold"></h1> */}
          <p className="text-lg text-emerald-600 mt-2">Crea, modifica, elimina departamentos</p>

          <article className='flex justify-between flex-col lg:flex-row py-5 border-b-2 border-emerald-300'>
            {
              departamentos.length > 0 &&
              (
                <button className='bg-green-500 py-3 px-10 rounded text-white font-bold'
                  onClick={() => setFormularioDepartamento(true)}
                >Crear Departamento
                </button>
              
              )
            }
          </article>
          {departamentos.length === 0 ? (
            <article className='flex flex-col items-center rounded p-5 justify-center bg-emerald-300'>
              <p className='text-emerald-700 text-2xl'>Agrega un departamento</p>
              <button className='text-emerald-700 bg-transparent rounded-2xl'
                onClick={() => setFormularioDepartamento(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

              </button>
            </article>
          ) : (<article className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5 gap-5">
            {
              departamentos.length > 0 &&
              departamentos.map((departamento, i) => (
                <button 
                    onClick={() => navigate(`/admin/departamentos/${departamento.nombre}`)}
                    key={i} className="bg-emerald-100 rounded-lg p-5 flex flex-col gap-3">
                    { departamento.nombre.replace(/-/g, ' ') }
                    
                </button>
              ))
            }
          </article>)}

        </section>

      </main>
      </Fragment>
  )
}
