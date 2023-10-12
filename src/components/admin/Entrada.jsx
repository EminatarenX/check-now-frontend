import React from 'react'

export default function Entrada({entrada}) {
    const {nombre, apellido, fecha, plaza, horaEntrada} = entrada
  return (
    <div className="bg-emerald-800 flex justify-between rounded w-full p-4 min-w-[800px] animate-entrada">
       
    <p className="text-white text-lg font-semibold">{nombre}</p>
    <p className="text-white text-lg font-semibold">{apellido}</p>
    <p className="text-white text-lg font-semibold">{fecha}</p>
    <p className="text-white text-lg font-semibold">{plaza}</p>
    <p className="text-white text-lg font-semibold">{horaEntrada}</p>
    <div className="flex gap-2">
        <button className="bg-emerald-700 text-white px-2 py-1 rounded">Editar</button>
        <button className="bg-rose-700 text-white px-2 py-1 rounded">Eliminar</button>
    </div>

</div>
  )
}
