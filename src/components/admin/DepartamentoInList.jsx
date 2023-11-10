import { useEffect } from "react"
import Swal from "sweetalert2";

// Redux
import { eliminarDepartamentoAction } from "../../actions/empresasAction";
import { setDepartamentoAction } from "../../actions/helperAction";
import { useDispatch } from "react-redux";

export default function DepartamentoInList({departamento, i, navigate, iconosDepartamentos, setEditarDepartamento, setFormularioDepartamento,
  setIconoDepartamento, setNombreDepartamento, setDepartamentoId
}) {
  const dispatch = useDispatch()

    useEffect(()=> {
    if(departamento){

      const departamentoDom = document.querySelector(`.departamento:nth-child(${i + 1})`);

      const handleMouseEnter = () => {
        const boton = document.createElement('button');
        boton.classList.add('boton-editar-departamento');
        boton.innerHTML = 'Editar';
        departamentoDom.appendChild(boton);

        const botonEliminar = document.createElement('button');
        botonEliminar.classList.add('boton-eliminar-departamento');
        botonEliminar.innerHTML = 'Eliminar';
        departamentoDom.appendChild(botonEliminar);

        boton.addEventListener('click', handleClick); 
        botonEliminar.addEventListener('click', handleClickEliminar);
      };

      const handleClickEliminar = () => {
        Swal.fire({
          title: '¿Estás seguro?',
          text: "Esta acción no se puede revertir",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#10B981',
          cancelButtonColor: '#EF4444',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            // TODO: Eliminar departamento
            dispatch(eliminarDepartamentoAction(departamento._id))
          }
        })
      };
      const handleClick = () => {
        setNombreDepartamento(departamento.nombre)
        setIconoDepartamento(departamento.icon)
        setDepartamentoId(departamento._id)
        setEditarDepartamento(true)
        setFormularioDepartamento(true)
      }
  
      const handleMouseLeave = () => {
        const boton = departamentoDom.querySelector('.boton-editar-departamento');
        const botonEliminar = departamentoDom.querySelector('.boton-eliminar-departamento');
        if (boton) {
          departamentoDom.removeChild(boton);
        }
        if (botonEliminar) {
          departamentoDom.removeChild(botonEliminar);
        }
      };


         // Agregar eventos solo una vez al cargar el componente
    departamentoDom.addEventListener('mouseenter', handleMouseEnter);
    departamentoDom.addEventListener('mouseleave', handleMouseLeave);
     
    return () => {
      departamentoDom.removeEventListener('mouseenter', handleMouseEnter);
      departamentoDom.removeEventListener('mouseleave', handleMouseLeave);
    };
    }

    
  },[departamento])
  return (
    <div
    className="bg-emerald-900 rounded-lg gap-3 departamento relative animate-entrada">
    <button
      onClick={() => {
   
        dispatch(setDepartamentoAction(departamento._id))
        navigate(`/admin/departamentos/${departamento.nombre}`)
      }} 
       className="flex items-center p-5 gap-3 capitalize">

        {iconosDepartamentos.find((icono) => icono.nombre === departamento.icon) ? (
        iconosDepartamentos.find((icono) => icono.nombre === departamento.icon).icon()
        ) : (

        <div>Icono no encontrado</div>
        )}
        <span className='text-sm text-white font-semibold'>{departamento.nombre.replace(/-/g, ' ')}</span>
    </button>  
    
  </div>
  )
}
