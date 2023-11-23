import EmpleadoInfo from "../../components/admin/EmpleadoInfo";
import TablaEmpleado from "../admin/TablaEmpleado";
import { useEffect, useState } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getDatosEmpleadoAction, registrarEntradaAction, registrarSalidaAction } from "../../actions/empleadosAction"

export default function UserIndex() {
 
    const dispatch = useDispatch();
    const { loading, datos, id } = useSelector((state) => state.empleado);
    const [checks, setChecks ] = useState([])
    const [filtro, setFiltro] = useState({ departamento: "",categoria: "",fecha: '',})

    const registrarEntrada = (entrada) => {
      const fecha = new Date()  
      const hora = fecha.getHours()
      const minutes = fecha.getMinutes()
      
      const entradaArray = entrada.split(':')
      const horaEntrada = Number(entradaArray[0])
      const minutosEntrada = Number(entradaArray[1])

      let entradaObject = {comentarios: ''}
      
      
      if(hora >= horaEntrada){
        if(minutes > (minutosEntrada + 15)){
          entradaObject.comentarios = 'Tarde'
        }else {
          entradaObject.comentarios = 'Puntual'
        }
      }else if(hora > horaEntrada){
          entradaObject.comentarios = 'Tarde'
      }
      dispatch(registrarEntradaAction(entradaObject))
    }

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

      if(!datos) return
      
      let checksFiltrados = [...datos?.checks] 


      if(filtro.fecha.includes('-')){
        checksFiltrados = checksFiltrados.filter(
          entrada => {
            const fechaFiltro = new Date(filtro.fecha)
            const fechaCheck = new Date(entrada.fecha_entrada)
            const fechaFiltroFormateada = `${fechaFiltro.getFullYear()}-${fechaFiltro.getMonth() + 1}-${fechaFiltro.getDate()+1}`
            const fechaCheckFormateada = `${fechaCheck.getFullYear()}-${fechaCheck.getMonth() + 1}-${fechaCheck.getDate()}`
            if(fechaFiltroFormateada === fechaCheckFormateada){
              return entrada
            }
          }
        )
        setChecks(checksFiltrados)
      }else{
        setChecks(checksFiltrados)
      }
      
    }

    useEffect(()=> {
      filtrarYOrdenarChecks()

    },[filtro, datos?.checks])

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

                  <button 
                    className="w-full bg-emerald-100 text-emerald-600 py-10 lg:py-3 rounded font-semibold" 
                    onClick={() => registrarEntrada(datos?.plaza.horario_entrada)}
                    disabled={loading ? true : false}
                  >
                      Entrar {datos?.plaza?.horario_entrada}
                  </button>
                  <button 
                    className="w-full bg-red-100 text-red-500 py-10 lg:py-3 rounded font-semibold" 
                    onClick={() => dispatch(registrarSalidaAction())}
                    disabled={loading ? true : false}
                  >
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



  
