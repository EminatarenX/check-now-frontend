import React from 'react'

export default function CheckInOut({check}) {
    const {nombre, apellidos, fecha, plaza , horaEntrada, horaSalida } = check
  return (
    <tr className=''>
        <td className='border border-emerald-900 p-2'>{nombre}</td>
        <td className='border border-emerald-900 p-2'>{apellidos}</td>
        <td className='border border-emerald-900 p-2'>{fecha}</td>
        <td className='border border-emerald-900 p-2'>{plaza}</td>
        <td className='border border-emerald-900 p-2'>{horaEntrada}</td>
        <td className='border border-emerald-900 p-2'>{horaSalida}</td>
    </tr>
  )
}
