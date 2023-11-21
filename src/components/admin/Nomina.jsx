import { DocumentIcon } from "@heroicons/react/20/solid";
import { formatearFecha } from "../../helpers/index";
import { useState } from "react";
import Swal from "sweetalert2";
//redux

import { useDispatch } from "react-redux";
import { eliminarNominaAction } from "../../actions/empresasAction";
export default function Nomina({nomina}) {
    const dispatch = useDispatch();
    const [mostrarBotonEliminar, setMostrarBotonEliminar] = useState(false);

    const handleMouseEnter = () => {
      setMostrarBotonEliminar(true);
    };
  
    const handleMouseLeave = () => {
      setMostrarBotonEliminar(false);
    };
  
    const handleClickEliminar = () => {
      Swal.fire({
        title: '¿Estás seguro de eliminar este documento?',
        text: 'Esta acción no se puede revertir',
        icon: 'warning',
        iconColor: '#EF4444',
        showCancelButton: true,
        confirmButtonColor: '#EF4444',
        cancelButtonColor: 'gray',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const result = await dispatch(eliminarNominaAction(nomina._id));
        }
      });
    };


  return (
    <div
      key={nomina._id}
      className={`flex flex-col items-center animate-entrada relative pdf ${mostrarBotonEliminar ? 'hover-con-boton' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button onClick={() => window.open(nomina.url)} type="button">
        <DocumentIcon className="text-red-500 h-20" />
      </button>
      <p className="text-emerald-900 text-center text-xs">{nomina.empleado.usuario.nombre} {nomina.empleado.usuario.apellidos}</p>
      <p className="text-emerald-900 text-center text-[10px]">{formatearFecha(nomina.fecha_emision)}</p>

      {mostrarBotonEliminar && (
        <button className="w-full animate-entrada transition-all bg-red-500 p-2 rounded text-white font-semibold mt-2 text-sm" onClick={handleClickEliminar}>
          Eliminar
        </button>
      )}
    </div>
  )
}
