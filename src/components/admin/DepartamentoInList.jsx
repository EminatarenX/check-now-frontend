import { useEffect } from "react"

export default function DepartamentoInList({departamento, i, navigate, iconosDepartamentos}) {
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
        console.log('Eliminar departamento');
      };
  
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
      const handleClick = () => {
        navigate(`/admin/departamentos/editar/${departamento._id}`)
      }


         // Agregar eventos solo una vez al cargar el componente
    departamentoDom.addEventListener('mouseenter', handleMouseEnter);
    departamentoDom.addEventListener('mouseleave', handleMouseLeave);
     
    return () => {
      departamentoDom.removeEventListener('mouseenter', handleMouseEnter);
      departamentoDom.removeEventListener('mouseleave', handleMouseLeave);
    };
    }

    // Agregar eventos solo una vez al cargar el componente
    
  },[departamento])
  return (
    <div
    
    className="bg-emerald-100 rounded-lg p-3 gap-3 departamento relative">
    <button
      onClick={() => navigate(`/admin/departamentos/${departamento.nombre}`)} 
       className="flex items-center gap-3 capitalize">

        {iconosDepartamentos.find((icono) => icono.nombre === departamento.icon) ? (
        iconosDepartamentos.find((icono) => icono.nombre === departamento.icon).icon()
        ) : (

        <div>Icono no encontrado</div>
        )}
        <span className='text-sm text-emerald-800 font-semibold'>{departamento.nombre.replace(/-/g, ' ')}</span>
    </button>  
    
  </div>
  )
}
