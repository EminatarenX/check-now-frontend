import { Link } from "react-router-dom";
export default function Trabajador({ empleado, i }) {


  return (
    <tr key={empleado._id} className={`${(i+1) % 2 === 0 ? 'bg-white' : 'bg-neutral-100'} rounded w-full shadow animate-entrada border-b`}>
      <td className="text-emerald-950 text-sm capitalize py-1">{empleado.usuario.nombre}</td>
      <td className="text-emerald-950 text-sm capitalize">{empleado.usuario.apellidos}</td>
      <td className="text-emerald-950 text-sm ">{empleado.usuario.correo}</td>
      <td className="text-emerald-950 text-sm ">{empleado.usuario.telefono}</td>
      <td className="text-emerald-700 cursor-pointer text-sm"><Link to={`/admin/trabajadores/${empleado._id}`}>Ver detalles</Link></td>
    </tr>
  );
}
