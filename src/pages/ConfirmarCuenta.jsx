import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { confirmarUsuarioAction} from '../actions/usuariosActions'

export default function ConfirmarCuenta() {
    const { token } = useParams()

    const dispatch = useDispatch()
    const cargando = useSelector( state => state.usuarios.loading)
    const error = useSelector( state => state.usuarios.error)

    

    useEffect(()=> {
        dispatch(confirmarUsuarioAction(token))
    },[]) 
    
  return (
    <div className='bg-gradient-to-r from-emerald-800 to-emerald-500 h-80 p-10 flex flex-col '> 
        {
            cargando ? <p className={`text-white text-center font-semibold text-2xl`}>Cargando, por favor espere ...</p> : <p className={`text-white text-center font-semibold text-2xl`}>Confirmar cuenta</p>
        }
        {
            error ? <p className={error.classes}>{error.msg}</p> : null
        }
        
       <div className='flex justify-center'>
       <Link to='/login' className="rounded text-center text-white font-bold w-80 py-3 mt-10 border border-emerald-500 hover:bg-emerald-400 transition-all"> 
            Volver al inicio de sesión
        </Link>
       </div>
    </div>
  )
}
