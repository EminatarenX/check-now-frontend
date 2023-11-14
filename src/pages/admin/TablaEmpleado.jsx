import { formatearFecha, obtenerHoraEntrada } from "../../helpers"

export default function TablaEmpleado({empleadoActual, checks}) {

  const checksHelper = empleadoActual ? empleadoActual.checks : checks
 
  return (
    <div className="overflow-x-scroll overflow-y-scroll lg:overflow-x-hidden min-h-[400px] max-h-[400px]">
    <table className="table-auto bg-white p-2 rounded min-w-[800px] gap-1 mt-5 w-full">
                <thead>
                    
                  <tr className="sticky top-0 bg-white">
                  <th className="py-2 text-left border-b border-gray-400 text-emerald-900">
                      Fecha
                    </th>
                    <th className="py-2 text-left border-b border-gray-400 text-emerald-900">
                      Hora de Entrada
                    </th>
                    <th className="py-2 text-left border-b border-gray-400 text-emerald-900">
                      Hora de salida
                    </th>
                    <th className="py-2 text-left border-b border-gray-400 text-emerald-900">
                      Comentarios
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                    {
                        checksHelper.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-2 text-left border-b border-gray-400 text-emerald-900">
                                    No hay entradas y salidas
                                </td>
                            </tr>
                        ) : (
                            checksHelper.map((check, i) => (
                                <tr key={check._id} className={`${(i+1) % 2 === 0 ? 'bg-white' : 'bg-neutral-100'} rounded w-full shadow animate-entrada border-b`}>
                                  <td className="text-emerald-950 text-md ">
                                        {formatearFecha(check.fecha_entrada)}
                                    </td>
                                    <td className="text-emerald-950 text-md ">
                                        {obtenerHoraEntrada(check.fecha_entrada)}
                                    </td>
                                    <td className="text-emerald-950 text-md ">
                                        {check.fecha_salida ? obtenerHoraEntrada(check.fecha_salida) : 'No registrada'}
                                    </td>
                                    <td className="text-emerald-950 text-md ">
                                        {check.comentarios}
                                    </td>
                                </tr>
                            )
                            )
                        )
                    }
                </tbody>
              </table>
              </div>
  )
}
