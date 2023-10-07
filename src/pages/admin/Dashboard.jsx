import { useSelector } from "react-redux"
import { accionesDashboard } from "../../helpers"
import AccionDashboard from "../../components/AccionDashboard"
import { useEffect, useState } from "react"

export default function Dashboard() {


  const usuario = useSelector( state => state.usuarios.user)
  return (
    <main className='bg-emerald-950'>


      <section className='bg-emerald-200 rounded-tl-[100px] p-14 lg:p-20'>
      <h1 className='text-4xl text-emerald-900 font-semibold'>Bienvenido {usuario.nombre}</h1>
        <p className='text-emerald-900 text-lg'>Este es el panel de administracion</p>

        <article className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-10">
          {
            accionesDashboard.map( (accion, i) => (
              <AccionDashboard
                parametros={accion}
                key={i}
              />
            ))
          }
        </article>
      </section>
    </main>
  )
}
