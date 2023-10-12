import CheckInOut from "../../components/admin/CheckInOut"
import { useState } from "react"
import Salida from "../../components/admin/Salida"
import Entrada from "../../components/admin/Entrada"
export default function EntradasSalidas() {
  const [filtro, setFiltro ] = useState('entradas')

  const [entradas, setEntradas ] = useState([
    {
      nombre: 'Emiliano',
      apellido: 'Gonzalez',
      fecha: '2021-10-01',
      plaza: 'Contador',
      horaEntrada: '08:00',
      

    },
    {
      nombre: 'Emiliano',
      apellido: 'Gonzalez',
      fecha: '2021-10-01',
      plaza: 'Contador',
      horaEntrada: '08:00',
      

    },
    {
      nombre: 'Emiliano',
      apellido: 'Gonzalez',
      fecha: '2021-10-01',
      plaza: 'Contador',
      horaEntrada: '08:00',
      

    },
    {
      nombre: 'Emiliano',
      apellido: 'Gonzalez',
      fecha: '2021-10-01',
      plaza: 'Contador',
      horaEntrada: '08:00',


    },
  ])
  const [salidas, setSalidas ] = useState([
    {
      nombre: 'Emiliano',
      apellido: 'Gonzalez',
      fecha: '2021-10-01',
      plaza: 'Contador',

      horaSalida: '16:00',

    },
    {
      nombre: 'Emiliano',
      apellido: 'Gonzalez',
      fecha: '2021-10-01',
      plaza: 'Contador',

      horaSalida: '16:00',

    },
    {
      nombre: 'Emiliano',
      apellido: 'Gonzalez',
      fecha: '2021-10-01',
      plaza: 'Contador',

      horaSalida: '16:00',

    },
    {
      nombre: 'Emiliano',
      apellido: 'Gonzalez',
      fecha: '2021-10-01',
      plaza: 'Contador',
      horaEntrada: '08:00',
      horaSalida: '16:00',

    },
  ])
  return (
    <main className="bg-emerald-950">
    <section className="bg-emerald-200 rounded-tl-[100px] rounded-br-[100px] p-14 lg:p-20">
    <h1 className="text-emerald-900 text-4xl font-semibold">Registro de entradas y salidas</h1>
          <p className="text-lg text-emerald-600 mt-2">Aqui podras ver todas las entradas y salidas de tus trabajadores</p>
            <article className=''> 
                 
                <nav className="flex flex-col lg:flex-row gap-5 justify-between">
                  <ul className="flex gap-2 justify-between">
                      <button 
                        className={`${filtro === 'entradas' && 'bg-emerald-300'} rounded py-2 lg:w-40 font-semibold text-emerald-800 text-center w-full`}
                        onClick={ () => setFiltro('entradas')}
                      >
                        Entradas
                      </button>
                      <button 
                        className={`${filtro === 'salidas' && 'bg-rose-400 text-white'} rounded py-2 lg:w-40 font-semibold text-emerald-800 text-center w-full`}
                        onClick={ () => setFiltro('salidas')}
                      >
                        Salidas
                      </button>
                  </ul>
                  <ul className="flex gap-2 flex-col lg:flex-row justify-between">
                    <button className="bg-teal-500 rounded py-2 w-full font-semibold text-emerald-100 text-center lg:w-40">
                      Filtro
                    </button> 
                    <button className="bg-green-500 rounded py-2 w-full font-semibold text-emerald-100 text-center lg:w-40">  
                      Registrar entrada
                    </button>
                  </ul>
                </nav>
                 

              { entradas.length === 0 ? ( 
                <p className="bg-emerald-300 text-emerald-700 text-center mt-5 p-5 rounded">
                  No hay {filtro === 'entradas' ? 'entradas' : 'salidas'} registradas
                </p>
              ) : (
                <article className='flex flex-col bg-emerald-950 rounded overflow-y-auto max-h-[600px] p-5 gap-4 mt-5'>
                  {
                    filtro === 'entradas' ? (
                      entradas.map( entrada => (
                        <Entrada 
                          key={entrada.id} 
                          entrada={entrada}
                        />
                      ))
                    ) : (
                      salidas.map( salida => (
                        <Salida key={salida.id} salida={salida} />
                      ))
                    )
                    
                  }
               </article>
  
                )}
          </article>

    </section>
    </main>
  )
}
