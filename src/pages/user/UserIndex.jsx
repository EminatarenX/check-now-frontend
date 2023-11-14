import EmpleadoInfo from "../../components/admin/EmpleadoInfo";
import TablaEmpleado from "../admin/TablaEmpleado";
import { useEffect, useState } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getDatosEmpleadoAction } from "../../actions/empleadosAction"

export default function UserIndex() {
 
    const dispatch = useDispatch();
    const { loading, datos, id } = useSelector((state) => state.empleado);
    const [checks, setChecks ] = useState([])
    const [filtro, setFiltro] = useState({ departamento: "",categoria: "",fecha: '',})

    const fechaMaxima = () => {
      const fechaMax = new Date()
      fechaMax.setFullYear(fechaMax.getFullYear() )
  
      const fechaFormateada = fechaMax.toISOString().split('T')[0]
      return fechaFormateada
    }
  
    useEffect(() => {
      dispatch(getDatosEmpleadoAction(id));
    }, []);

    const filtrarYOrdenarChecks = () => {
      let checksFiltrados = [...datos?.checks] 
  
     
      
      if(filtro.fecha.length !== 0){
        checksFiltrados = checksFiltrados.filter(
          entrada => {
            const formatDate = entrada.fecha_entrada.split('T')[0]
           
            if(formatDate === filtro.fecha){
              return formatDate
            }
          }
        )
      }
  
      
  
      setChecks(checksFiltrados)
    }

    useEffect(()=> {
      filtrarYOrdenarChecks()

    },[filtro])

  return (
    <section className="flex flex-col">
        <article className="bg-white p-2 rounded-xl">

            {loading && !datos ? (
            <div className="flex justify-center">
              <div className="rounded-full h-40 w-40 border-b border-l border-r border-emerald-900 animate-spin relative"></div>
            </div>
          ) : (
            datos && (
              <>
              <h2 className="text-4xl font-semibold text-emerald-900 text-center">Registro</h2>
          
              <div className="flex flex-col lg:flex-row gap-5 mt-5">

                  <button className="w-full bg-emerald-100 text-emerald-600 py-3 rounded font-semibold">
                      Entrar {datos?.plaza?.horario_entrada}
                  </button>
                  <button className="w-full bg-red-100 text-red-500 py-3 rounded font-semibold">
                      Salir {datos?.plaza?.horario_salida}
                  </button>
              </div>
                <EmpleadoInfo empleado={datos} />
                  <h2 className="text-emerald-900 text-2xl font-semibold mt-5">
                      Historial de entradas y salidas
                  </h2>
                  <input type="date" value={filtro.fecha} onChange={e => setFiltro({...filtro, fecha: e.target.value})} max={fechaMaxima()}/>
                  <TablaEmpleado checks={checks}/>   
                {/* <pre className="text-sm text-emerald-950 font-semibold">
                  {JSON.stringify(datos, null, 2)}
                </pre> */}
              </>
            )
          )}
      </article>
    </section>
  )
}



  
