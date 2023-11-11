
export default function Trabajador({empleado}) {

    
  return (
    <div className="bg-white flex justify-between rounded w-full px-2 py-5 shadow animate-entrada">
       
            <p className="text-emerald-950 text-lg font-semibold capitalize">{empleado.usuario.nombre}</p>
            {/* <p className="text-white text-lg font-semibold">{empleado.usuario.correo}</p> */}
         

    </div>
  )
}
