import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginUsuarioAction, resetearMensajeAction } from "../actions/usuariosActions"
import { useEffect } from "react"

export default function IniciarSesion() {
    const [correo, guardarCorreo ] = useState('')
    const [ password, guardarPassword ] = useState('')

    const dispatch = useDispatch()
    const cargando = useSelector( state => state.usuarios.loading)
    const error = useSelector( state => state.usuarios.error)
    const mensaje = useSelector( state => state.usuarios.user?.msg)

    const handleLogin = (e) => {
        e.preventDefault()
        if([correo,password].includes('')){
            return
        }

        dispatch(loginUsuarioAction({correo,password}))
    }

    useEffect(()=> {
        dispatch(resetearMensajeAction())
    },[])
  return (
    <main className={`bg-gradient-to-r from-emerald-800 to-emerald-500 flex justify-center pt-40`}>

        <form 
            className='flex flex-col w-1/3 bg-emerald-900 p-5 rounded-lg shadow-2xl gap-5  w-3/4 lg:w-1/3'
            onSubmit={handleLogin}
        >
           {
                cargando ? <p className="text-white text-center w-full py-2 rounded font-semibold bg-emerald-500">Cargando...</p> : null
            }
            {
                error ? <p className={`${error.classes}`}>{error.msg}</p> : null
            } 
            {
                mensaje ? <p 
                className={`bg-emerald-500 text-white text-center w-full py-2 rounded font-semibold`}
                
                >{mensaje.cuerpo} ;)</p> : null
            }
            
            <input type="email" 
                placeholder="Correo Electronico"
                className={`bg-transparent text-white  border-b-2 border-emerald-300 focus:outline-none p-2 placeholder:text-white focus:scale-105 transition-all`}
                onChange={e => guardarCorreo(e.target.value)}

            />
            
            <input type="password"
                placeholder="Contraseña"
                className={`bg-transparent text-white  border-b-2 border-emerald-300 focus:outline-none p-2 placeholder:text-white focus:scale-105 transition-all`}
                onChange={e => guardarPassword(e.target.value)}
            />
            
            <input 
                className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded "
            type="submit" value="Registrar" 
            
            />
        </form>
</main>
  )
}
