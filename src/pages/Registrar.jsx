import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { registrarUsuarioAction, resetearMensajeAction } from "../actions/usuariosActions"

export default function Registrar() {

    const [correo, guardarCorreo ] = useState('')
    const [ password, guardarPassword ] = useState('')
    const [ repetirPassword, guardarRepetirPassword ] = useState('')

    const dispatch = useDispatch()

    const cargando = useSelector( state => state.usuarios.loading)
    const error = useSelector( state => state.usuarios.error)

    

    const handleRegistrar = (e) => {
        e.preventDefault()

        if([correo, password].includes('')){
            toast.error('Todos los campos son obligatorios')
            return
        }

        if( password.length < 6){
            toast.error('La contraseña debe tener al menos 6 caracteres')
            return
        }
        if( password !== repetirPassword){
            toast.error('Las contraseñas no coinciden')
            return
        }

        dispatch(registrarUsuarioAction({correo, password}))
    }

    useEffect(()=> {
        dispatch(resetearMensajeAction())
    },[])
    
  return (
    <main className={`bg-gradient-to-r from-emerald-800 to-emerald-500 flex justify-center pt-20`}>
        <form 
            className='flex flex-col w-1/3 bg-emerald-900 p-5 rounded-lg shadow-2xl gap-5 w-3/4 lg:w-1/3 '
            onSubmit={handleRegistrar}
        >
            {
                cargando ? <p className="text-white text-center w-full py-2 rounded font-semibold bg-emerald-500">Cargando...</p> : null
            }
            {
                error ? <p className={`${error.classes}`}>{error.msg}</p> : null
            }
            
            <input type="email" 
                placeholder="Correo electrónico"
                className={`bg-transparent text-white  border-b-2 border-emerald-300 focus:outline-none p-2 placeholder:text-white focus:scale-105 transition-all`}
                onChange={e => guardarCorreo(e.target.value)}
                value={correo}

            />
            
            <input type="password"
                placeholder="Contraseña"
                className={`bg-transparent text-white  border-b-2 border-emerald-300 focus:outline-none p-2 placeholder:text-white focus:scale-105 transition-all`}
                value={password}
                onChange={e => guardarPassword(e.target.value)}
            />
            
            <input type="password"
                placeholder="Repetir Contraseña"
                className={`bg-transparent text-white  border-b-2 border-emerald-300 focus:outline-none p-2 placeholder:text-white focus:scale-105 transition-all`}
                value={repetirPassword}
                onChange={e => guardarRepetirPassword(e.target.value)}
            />
            <input 
                className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded "
            type="submit" value="Registrar" 
            
            
            />

                <Link to={'/login'} className="text-emerald-100 hover:text-white hover:no-underline transition-all underline underline-offset-4"> 
                    Ya tengo una cuenta!
                </Link> 

        </form>
    </main>
  )
}
