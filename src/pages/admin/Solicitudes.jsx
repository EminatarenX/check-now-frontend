import {useState} from 'react'

export default function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState([
    {
      nombre: 'Emiliano',
      apellido: 'Gonzalez',
      plaza: 'Contador',
      fecha: '2021-10-01',
    },
    {
      nombre: 'Emiliano',
      apellido: 'Gonzalez',
      plaza: 'Contador',
      fecha: '2021-10-01',
    },
    {
      nombre: 'Emiliano',
      apellido: 'Gonzalez',
      plaza: 'Contador',
      fecha: '2021-10-01',
    },
  ])
  const [cargando, setCargando ] = useState(false)
  return (
    <main className="bg-emerald-950">
    <section className="bg-white min-h-[500px] rounded-tl-[100px] rounded-br-[100px] p-14 lg:p-20">
     <h1 className="text-emerald-900 text-4xl font-semibold">Solicitudes de trabajadores</h1>
     <p className="text-lg text-emerald-600 mt-2">Aqui podras ver todas las solicitudes entrantes para ocupar tus plazas</p>
      {
        solicitudes.length === 0 && !cargando ? <p className="text-lg bg-slate-300 rounded p-5 text-emerald-600 mt-2">No hay solicitudes</p> :
        solicitudes.length === 0 && cargando ? 
        <p className="text-lg bg-slate-300 rounded p-5 text-emerald-600 mt-2">Cargando</p> : 
        <article className='bg-slate-300 rounded p-5 text-emerald-600 mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {
        solicitudes.map( (solicitud, i) => (
            <div className='bg-white shadow-xl p-3 rounded flex gap-5' key={ i}>
              <img className='w-20 h-20 rounded-full object-cover' 
                src="https://th.bing.com/th/id/R.abb5e2f3a89fe5f1871d9e13555a4cfb?rik=Gw6033iUygmZPQ&riu=http%3a%2f%2fcdn.marketing4ecommerce.net%2fwp-content%2fuploads%2f2017%2f01%2f02204956%2fqu%c3%a9-es-una-imagen-vectorial.jpg&ehk=HTmTsIAUN71R1e1kAp3MB6q0dm57GQVLk2TwmRfmuds%3d&risl=&pid=ImgRaw&r=0" alt="imagen-carro" />
              <div>
              <p>{solicitud.nombre + " " + solicitud.apellido}</p>
              <p>{solicitud.plaza}</p>
              <p>{solicitud.fecha}</p>
              </div>

            </div>
            ))
      }
       
        </article>
      }
    </section>
    </main>
  )
}
