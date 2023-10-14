import { useParams } from "react-router-dom"

export default function Categoria() {

    const { departamento } = useParams()
    const departamentoCapitalizado = departamento.charAt(0).toUpperCase() + departamento.slice(1).replace(/-/g, ' ')
  return (
    <main className='bg-emerald-950'>


    <section className='bg-emerald-200 rounded-tl-[100px] p-14 lg:p-20'>
  
    <article className="flex flex-col lg:flex-row gap-5 justify-between items-start">

    <h1 className='text-4xl text-emerald-900 font-semibold'>{departamentoCapitalizado} </h1>
      <p className='text-emerald-900 text-lg'></p>


    </article>


    </section>
  </main>
  )
}
