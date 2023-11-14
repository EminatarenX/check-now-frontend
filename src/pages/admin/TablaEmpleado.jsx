import React from 'react'

export default function TablaEmpleado({empleadoActual}) {
  return (
    <table className="table-auto bg-white p-2 rounded overflow-y-auto max-h-[600px] gap-1 mt-5 w-full">
                <thead>
                    
                  <tr>
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
                        empleadoActual.checks.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="py-2 text-left border-b border-gray-400 text-emerald-900">
                                    No hay entradas y salidas
                                </td>
                            </tr>
                        ) : (
                            empleadoActual.checks.map(check => (
                                <tr key={check._id}>
                                    <td className="py-2 text-left border-b border-gray-400 text-emerald-900">
                                        {check.fecha_entrada}
                                    </td>
                                    <td className="py-2 text-left border-b border-gray-400 text-emerald-900">
                                        {check.fecha_salida}
                                    </td>
                                    <td className="py-2 text-left border-b border-gray-400 text-emerald-900">
                                        {check.comentarios}
                                    </td>
                                </tr>
                            )
                            )
                        )
                    }
                </tbody>
              </table>
  )
}
