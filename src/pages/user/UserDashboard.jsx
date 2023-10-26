import {Fragment} from 'react'

export default function UserDashboard() {
    
  return (
      <section className='grid grid-cols-2 gap-2'>
        <article className='bg-white rounded p-2 col-span-2'>
        <h2 className='text-4xl text-emerald-900'>Registrar</h2>

        <div className='flex gap-5 mt-5 flex-col'>
          <button className='bg-emerald-200 border border-emerald-600 rounded p-10 text-emerald-900 w-full font-semibold text-2xl'>
              Entrada
          </button>
          <button className='bg-red-100 border border-red-600 rounded p-10 text-red-900 w-full font-semibold text-2xl'>
            Salida
          </button>
        </div>
      </article>
      <article className='bg-white rounded p-2 '>
        <h2 className='text-2xl text-emerald-900 font-semibold'>Plaza</h2>
      </article>
      <article className='bg-white rounded p-2 '>
        <h2 className='text-2xl text-emerald-900 font-semibold'>Empresa</h2>
      </article>

      <article className='bg-white rounded p-5 col-span-2'>
        <h2 className='text-2xl font-semibold text-emerald-900'>Resumen</h2>
      </article>  
    </section>
  )
}
