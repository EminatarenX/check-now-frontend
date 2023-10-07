import logo from '../assets/img/Logo.svg'
import imagenInicio from '../assets/img/img-inicio-check.svg'
export default function Inicio() {

  return (
    <main className="bg-gradient-to-r from-emerald-800 to-emerald-500">
      <section className="flex justify-evenly items-center p-20">
        <article>
            <h1 className="text-white text-6xl font-bold ">Administra tu negocio de manera <span className="text-emerald-400">mas sencilla</span></h1>
        </article>
        <img src={imagenInicio} alt="imagen-inicio"  className='hidden lg:block'/>
      </section>
      <section className="flex flex-col bg-emerald-800 p-20">
          <h2 className="text-white text-6xl font-bold text-center">¿Que es Check Now?</h2>
        <article className="mt-20 flex flex-col lg:flex-row gap-20 ">
         <div>
         <p className="text-white text-center text-xl">Check Now es una aplicacion web que te permite administrar tu negocio de manera mas sencilla, podras llevar un control de tus productos, ventas y clientes.</p>
         </div>
          <div>
          <p className="text-white text-center text-xl">Check Now es una aplicacion web que te permite administrar tu negocio de manera mas sencilla, podras llevar un control de tus productos, ventas y clientes.</p>
          </div>
          <div>
          <p className="text-white  text-center text-xl">Check Now es una aplicacion web que te permite administrar tu negocio de manera mas sencilla, podras llevar un control de tus productos, ventas y clientes.</p>
          </div>
        </article>
      </section>
    </main>
  )
}
