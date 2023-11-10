import { useState, useEffect } from "react";
import Scanner from "../../components/Scanner";
import { toast } from "react-toastify";
import { Html5QrcodeScanner } from "html5-qrcode";
import UserIndex from "./UserIndex";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { buscarPlazaAction, accederEmpresaAction, loginEmpleadoAction } from '../../actions/empleadosAction'


export default function UserDashboard() {
  const { empresa, buscarPlaza, loading } = useSelector((state) => state.empleado);
  
  const dispatch = useDispatch()
  


  useEffect(() => {
    const activarScanner = () => {
      if(empresa) return

      if(!document.getElementById('reader'))
        return

      const scanner = new Html5QrcodeScanner('reader',{
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      })  
  
      if(!scanner){
        return
      }
    
      scanner.render(success, error);
    
      function success(result) {
        scanner.clear();
        dispatch(buscarPlazaAction(result))
        
      }
      
      function error(err) {
        console.warn(err)
      }
    }
    
    activarScanner()
    dispatch(loginEmpleadoAction())
  },[])


  const  buscarEmpresa = e => {
    e.preventDefault()

    if(buscar.length === 0){
      toast.error('El campo esta vacio, intente de nuevo')

      return
    }
    
  }

  const Registrarme = () => {
    dispatch(accederEmpresaAction({empresa: buscarPlaza.categoria.departamento.empresa._id, plaza: buscarPlaza._id}))
  }

  if(empresa){
    return (
      <UserIndex/>
    )
  }else return (
    <>
    {
      loading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-2xl font-semibold">Cargando...</p>
        </div>
      ) : (
        <section className="grid grid-cols-2 gap-2">
      <article className="bg-white rounded p-2 col-span-2">
        {!empresa && (
          <form className="flex gap-5 py-5 flex-col relative"
            onSubmit={buscarEmpresa}
          >
            <p className="text-emerald-900 font-semibold text-2xl">
              Busca tu empresa para poder acceder a tus estadísticas de empleado
            </p>

            {
              buscarPlaza === null && <Scanner />
            }
          </form> 
        )}
       </article>

       {
  
        !buscarPlaza || loading ? (
          null
        ) : (
        
          <div className="bg-white rounded p-2 col-span1 lg:col-span-2">
            <p className="text-emerald-900 font-semibold text-2xl">Empresa encontrada</p>
            <p className="text-slate-500">Nombre: {buscarPlaza.nombre}</p>
            <p className="text-slate-500">Categoria: {buscarPlaza.categoria.nombre}</p>
            <p className="text-slate-500">Departamento: {buscarPlaza.categoria.departamento.nombre}</p>
            <p className="text-slate-500">Empresa: {buscarPlaza.categoria.departamento.empresa.nombre}</p>
            <p className="text-slate-500">Salario: {buscarPlaza.salario}</p>
            <p className="text-slate-500">Descripcion: {buscarPlaza.descripcion}</p>
            <p className="text-slate-500">Horario de entrada: {buscarPlaza.horario_entrada}</p>
            <p className="text-slate-500">Horario de salida: {buscarPlaza.horario_salida}</p>
            <button
            type = "button"

              className="bg-emerald-200 border border-emerald-600 rounded p-10 text-emerald-900 w-full font-semibold text-2xl"
              onClick={(Registrarme)}
            >
              Acceder
            </button>
          </div>
        
      )
    }
    
       
    </section>
      )
      
    }
    </>
  );
}
