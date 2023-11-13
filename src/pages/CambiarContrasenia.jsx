import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cambiarPasswordAction } from '../actions/usuariosActions'
import { useNavigate } from 'react-router-dom'

export default function CambiarContrasenia() {
    const [correo, guardarCorreo] = useState('')
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const error = useSelector( state => state.usuarios.error)

    const handleEnviar = (e) => {
        e.preventDefault()
        if(correo.length === 0){
            return
        }

        dispatch(cambiarPasswordAction({correo}))

        setTimeout(() => {
            if(error){
                navigate('/login')
            }
        }, 3000);
    }

  return (
    <main className='bg-gradient-to-r from-emerald-800 to-emerald-500  flex justify-center pt-40'>
        
        <form 
            onSubmit={handleEnviar}
            className='flex flex-col bg-emerald-900 p-5 rounded-lg shadow-2xl gap-5  w-3/4 lg:w-1/3'>
                {
                    error ? <p className={error.classes}>{error.msg}</p> : null
                }
         <input type="email" 
                placeholder="Correo electrónico"
                className={`bg-transparent text-white  border-b-2 border-emerald-300 focus:outline-none p-2 placeholder:text-white focus:scale-105 transition-all`}
                onChange={e => guardarCorreo(e.target.value)}

            />
            <input 
                className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded "
                type="submit" value="Enviar" 
            
            />
            
        </form>
    </main>
  )
}
