import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { recoveryPasswordAction } from '../actions/usuariosActions'
import { useParams } from 'react-router-dom'

export default function RecoveryPassword() {
  const [password, guardarPassword] = useState('')
  const [ repetir, guardarRepetir] = useState('')

  const dispatch = useDispatch()
  const error = useSelector( state => state.usuarios.error)
  const cargando = useSelector( state => state.usuarios.loading)
  const {token} = useParams()

  const handleEnviar = (e) => {
    e.preventDefault()

    if([password,repetir].includes('')){
      toast.error('Todos los campos son obligatorios',{
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
      return
    }

    if(password !== repetir){
      toast.error('Las contraseñas no coinciden',{
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        
        theme: "colored",
      })
      return
    }

    if(password.length < 6){
      toast.warning('La contraseña debe tener al menos 6 caracteres',{
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      })

      return
    }

    dispatch(recoveryPasswordAction({password, token}))

  }
  return (
    <main className='bg-gradient-to-r from-emerald-800 to-emerald-500  flex justify-center pt-40'>
        
    <form 
        onSubmit={handleEnviar}
        className='flex flex-col bg-emerald-900 p-5 rounded-lg shadow-2xl gap-5  w-3/4 lg:w-1/3'>
          {
              cargando ? <p className="text-white text-center w-full py-2 rounded font-semibold bg-emerald-500">Cargando...</p> : null
          }
            {
                error ? <p className={error.classes}>{error.msg}</p> : null
            }
     <input type="password" 
            placeholder="Contraseña nueva"
            className={`bg-transparent text-white  border-b-2 border-emerald-300 focus:outline-none p-2 placeholder:text-white focus:scale-105 transition-all`}
            onChange={e => guardarPassword(e.target.value)}
            value={password}
        />
             <input type="password" 
            placeholder="Repetir contraseña nueva"
            className={`bg-transparent text-white  border-b-2 border-emerald-300 focus:outline-none p-2 placeholder:text-white focus:scale-105 transition-all`}
            onChange={e => guardarRepetir(e.target.value)}
            value={repetir}
        />
        <input 
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded "
            type="submit" value="Enviar" 
            
        />
        
    </form>
</main>
  )
}
