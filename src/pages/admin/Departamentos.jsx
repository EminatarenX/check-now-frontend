import { useState, Fragment, useEffect } from 'react'
import FormularioDepartamento from '../../components/admin/FormularioDepartamento'
import DepartamentoInList from '../../components/admin/DepartamentoInList'
import { useNavigate } from 'react-router-dom'
import '../../styles/helpers.css'
import Regresar from '../../components/admin/Regresar'

// Redux
import { useSelector } from 'react-redux'
import { iconosDepartamentos } from '../../helpers'


export default function Departamentos() {
  const navigate = useNavigate()
  const departamentos = useSelector(state => state.empresa.departamentos)
  const loading = useSelector(state => state.empresa.loading)

  const [formularioDepartamento, setFormularioDepartamento] = useState(false)
  const [ editarDepartamento, setEditarDepartamento ] = useState(false)

  const [ iconoDepartamento, setIconoDepartamento ] = useState('')
  const [ nombreDepartamento, setNombreDepartamento ] = useState('')
  const [ departamentoId, setDepartamentoId ] = useState('')

  useEffect(() => {

    document.addEventListener('selectstart', (e) => {
      e.preventDefault()

    })

  }, [])


  return (
    <Fragment>
      {formularioDepartamento && <FormularioDepartamento 
        iconoDepartamento={iconoDepartamento}
        setIconoDepartamento={setIconoDepartamento}
        nombreDepartamento={nombreDepartamento}
        setNombreDepartamento={setNombreDepartamento}
        setFormularioDepartamento={setFormularioDepartamento}
       iconosDepartamentos={iconosDepartamentos} 
        setEditarDepartamento={setEditarDepartamento}
        editarDepartamento={editarDepartamento}
        departamentoId={departamentoId}
       />
       
       }

      <main className="bg-emerald-950">
        <section className="bg-white rounded-tl-[100px] min-h-[500px] p-10 lg:p-20"> 
          <Regresar/>
          <article className='flex justify-between flex-col lg:flex-row py-5 border-b-2 border-emerald-300'>
            {
              departamentos.length > 0 &&
              (
                <button className=' py-3 px-10 rounded text-green-700 border border-dotted border-green-600 hover:bg-green-600 hover:text-white transition-colors font-bold'
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
              loading ? <p className='text-emerald-800 text-4xl mt-5 pl-4 font-semibold'>Cargando...</p> :
              departamentos.length > 0 &&
              departamentos.map((departamento, i) => (
                <DepartamentoInList 
                  departamento={departamento} 
                  i={i} 
                  navigate={navigate} 
                  iconosDepartamentos={iconosDepartamentos} 
                  setEditarDepartamento={setEditarDepartamento}
                  setFormularioDepartamento={setFormularioDepartamento}
                  editarDepartamento={editarDepartamento}
                  setIconoDepartamento={setIconoDepartamento}
                  setNombreDepartamento={setNombreDepartamento}
                  setDepartamentoId={setDepartamentoId}
                  key={i}
                />
              ))
            }
          </article>)}

        </section>

      </main>
    </Fragment>
  )
}
