import React from 'react'

export default function Salida({salida}) {
    const {nombre, apellido, fecha, plaza, horaSalida} = salida
  return (
    <div className="bg-rose-800 flex justify-between rounded w-full p-4 min-w-[800px]">
       
    <p className="text-white text-lg font-semibold">{nombre}</p>
    <p className="text-white text-lg font-semibold">{apellido}</p>
    <p className="text-white text-lg font-semibold">{fecha}</p>
    <p className="text-white text-lg font-semibold">{plaza}</p>
    <p className="text-white text-lg font-semibold">{horaSalida}</p>
    <div className="flex gap-2">
        <button className="bg-teal-600 text-white px-2 py-1 rounded">Editar</button>
        <button className="bg-rose-500 text-white px-2 py-1 rounded">Eliminar</button>
    </div>

</div>
  )
}
