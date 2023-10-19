import { useSelector, useDispatch } from "react-redux"
import { accionesDashboard } from "../../helpers"
import { useNavigate } from "react-router-dom"
import AccionDashboard from "../../components/AccionDashboard"
import { useEffect } from "react"
import { cerrarSesionAction } from "../../actions/usuariosActions"
import { obtenerDepartamentosAction } from "../../actions/empresasAction"
import { obtenerDatosDeEmpresaAction } from "../../actions/empresasAction"
export default function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const datos_empresa = useSelector( state => state.empresa.datos)

  const cerrarSesion = () => {
      dispatch(cerrarSesionAction())
      navigate('/login')
  }



  const usuario = useSelector( state => state.usuarios.user)

  useEffect(()=> {
    if(!datos_empresa){

      dispatch(obtenerDatosDeEmpresaAction())
    }
    dispatch(obtenerDepartamentosAction())
  },[])


  return (
    <main className='bg-emerald-950'>


      <section className='bg-emerald-200 rounded-tl-[100px] p-14 lg:p-20'>
    
      <article className="flex flex-col lg:flex-row gap-5 justify-between items-start">
      <div>
      <h1 className='text-4xl text-emerald-900 font-semibold'>Bienvenido {usuario.nombre}</h1>
        <p className='text-emerald-900 text-lg'>Este es el panel de administracion</p>
      </div>
      <button 
        type="button"
        onClick={cerrarSesion}
        className="p-3 text-white rounded bg-emerald-900">
        Cerrar sesion
      </button>
      </article>

        <article className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-10">
          {
            accionesDashboard.map( (accion, i) => (
              <AccionDashboard
                parametros={accion}
                key={i}
              />
            ))
          }
        </article>
      </section>
    </main>
  )
}
