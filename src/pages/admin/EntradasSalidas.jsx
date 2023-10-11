import CheckInOut from "../../components/admin/CheckInOut"
import { useState } from "react"
export default function EntradasSalidas() {

  const [checks, setChecks ] = useState([
    {
      nombre: 'Emiliano',
      apellido: 'Gonzalez',
      fecha: '2021-10-01',
      plaza: 'Contador',
      horaEntrada: '08:00',
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
    {
      nombre: 'Emiliano',
      apellido: 'Gonzalez',
      fecha: '2021-10-01',
      plaza: 'Contador',
      horaEntrada: '08:00',
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
            <article className='bg-emerald-100 p-2 rounded grid grid-cols-1 lg:grid-cols-2'> 
              <div className=' grid-cols-2 gap-4'>
                <div className='col-span-1'>
                  <label htmlFor="fecha" className='text-emerald-900'>Fecha</label>
                  <input type="date" name="fecha" id="fecha" className='bg-emerald-50 p-2 rounded w-full' />
                </div>
                <div className='col-span-1'>
                  <label htmlFor="plaza" className='text-emerald-900'>Plaza</label>
                  <select name="plaza" id="plaza" className='bg-emerald-50 p-2 rounded w-full'>
                    <option value="Contador">Contador</option>
                    <option value="Contador">Contador</option>
                    <option value="Contador">Contador</option>
                    <option value="Contador">Contador</option>
                  </select>
                </div>
              </div>
              <div className='flex justify-end mt-4'>
                <button className='bg-emerald-600 text-emerald-100 p-2 rounded'>Buscar</button>
              </div>

              {
                // tabla para mostrar los checks
              }

              <table className='w-full mt-4'>
                <thead className='bg-emerald-600 text-emerald-100'>
                  <tr>
                    <th className='p-2'>Nombre</th>
                    <th className='p-2'>Apellido</th>
                    <th className='p-2'>Fecha</th>
                    <th className='p-2'>Plaza</th>
                    <th className='p-2'>Hora de entrada</th>
                    <th className='p-2'>Hora de salida</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    checks.map((check, index) => (
                      <CheckInOut key={index} check={check} />
                    ))
                  }
                </tbody>
              </table>

            </article>

    </section>
    </main>
  )
}
