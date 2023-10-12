import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import FormularioPlazas from '../../components/admin/FormularioPlazas'

export default function Plazas() {
  const [plazas, setPlazas] = useState([
    {
      nombre: 'contador publico',
      descripcion: 'Una descripcion de la plaza nomas',
      estado: 'Disponible',
      salario: 60000
    },
    {
      nombre: 'contador publico',
      descripcion: 'Una descripcion de la plaza nomas',
      estado: 'Disponible',
      salario: 60000
    },
    {
      nombre: 'contador publico',
      descripcion: 'Una descripcion de la plaza nomas',
      estado: 'Disponible',
      salario: 60000
    },
    {
      nombre: 'contador publico',
      descripcion: 'Una descripcion de la plaza nomas',
      estado: 'Disponible',
      salario: 60000
    }
  ])

  const [formularioPlaza, setFormularioPlaza] = useState(false)

  useEffect(() => {
    const mostrarAlerta = () => {
      toast.success('Pulsa en una plaza para ver mas detalles', {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: 'colored',
        type: 'success',

      })
    }
    mostrarAlerta()
  }, [])
  return (
    <>
      {formularioPlaza && <FormularioPlazas setFormularioPlaza={setFormularioPlaza} />}
      <main className="bg-emerald-950">
        <section className="bg-emerald-200 rounded-tl-[100px] rounded-br-[100px] p-14 lg:p-20">
          <h1 className="text-emerald-900 text-4xl font-semibold">Administrador de plazas</h1>
          <p className="text-lg text-emerald-600 mt-2">Crea, modifica, elimina plazas y consulta tus plazas</p>

          <article className='flex justify-between flex-col lg:flex-row py-5 border-b-2 border-emerald-300'>
            {
              plazas.length > 0 &&
              (<>
                <button className='bg-green-500 py-3 px-10 rounded text-white font-bold'
                  onClick={() => setFormularioPlaza(true)}
                >Crear plaza</button>
                <input type="text"
                  placeholder="Buscar plaza por nombre"
                  className={`bg-transparent text-emerald-900   focus:outline-none mt-5 lg:mt-0 p-3 placeholder:text-emerald-700 focus:scale-105 transition-all`}

                />
              </>
              )
            }
          </article>
          {plazas.length === 0 ? (
            <article className='flex flex-col items-center rounded p-5 justify-center bg-emerald-300'>
              <p className='text-emerald-700 text-2xl'>Crear una plaza</p>
              <button className='text-emerald-700 bg-transparent rounded-2xl'
                onClick={() => setFormularioPlaza(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

              </button>
            </article>
          ) : (<article className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5 gap-5">
            {
              plazas.length > 0 &&
              plazas.map((plaza, i) => (
                <div key={i} className="bg-emerald-100 rounded-lg p-5 flex flex-col gap-3">
                  <p className="text-emerald-900 font-semibold text-2xl capitalize">{plaza.nombre}</p>
                  <div>
                    <p className="text-emerald-700 ">{plaza.descripcion}</p>
                    <p className="text-emerald-700">${plaza.salario}</p>
                    <p className="text-emerald-600">{plaza.estado}</p>

                  </div>
                </div>
              ))
            }
          </article>)}

        </section>

      </main>
    </>
  )
}
