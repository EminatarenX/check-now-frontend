import {
    REGISTRAR_USUARIO,
    REGISTRAR_USUARIO_ERROR,
    REGISTRAR_USUARIO_EXITO,
    LOGIN_USUARIO,
    LOGIN_USUARIO_ERROR,
    LOGIN_USUARIO_EXITO,
    CONFIRMAR_USUARIO,
    CONFIRMAR_USUARIO_ERROR,
    CONFIRMAR_USUARIO_EXITO,
    RESETEAR_MENSAJE,
    CAMBIAR_PASSWORD,
    CAMBIAR_PASSWORD_EXITO,
    CAMBIAR_PASSWORD_ERROR
} from '../types'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify'

import clienteAxios from '../config/axios'

export function registrarUsuarioAction(usuario) {
    return async (dispatch) => {
        dispatch(registrarUsuario())

        try {
            await clienteAxios.post("/usuarios", usuario)
            dispatch(registrarUsuarioExito())

            Swal.fire(
                'Listo!',
                'Usuario registrado, verifica tu direccion de correo electronico para confirmar tu cuenta ;)',
                'success'
            )
            
        } catch (error) {
            const mensaje = {
                msg: error.response.data.msg,
                classes: 'bg-red-500 text-white font-bold w-full p-2 text-center my-3 rounded'
            }
            dispatch(registrarUsuarioError(mensaje))

        }
    }
}

const registrarUsuario = () => ({
    type: REGISTRAR_USUARIO,
    payload: true
})

const registrarUsuarioExito = () => ({
    type: REGISTRAR_USUARIO_EXITO,
    payload: true
})

const registrarUsuarioError = mensaje => ({
    type: REGISTRAR_USUARIO_ERROR,
    payload: mensaje
})

// la funcion de login pendiente hasta que se implemente el la funcion de verificar usuario

export function loginUsuarioAction(usuario) {
    return async (dispatch) => {
        dispatch(loginUsuario())

        try {

            const { data } = await clienteAxios.post("/usuarios/login", usuario)

            localStorage.setItem('token', data.token)

            dispatch(loginUsuarioExito(data.token))

            
            setTimeout(() => {
                window.location.reload()
            }, 1000);
            
        } catch (error) {
            console.log(error)
            const mensaje = {
                msg: error.response.data.msg,
                classes: 'bg-red-500 text-white font-bold w-full p-2 text-center my-3 rounded'
            }
            dispatch(loginUsuarioError(mensaje))
        }
    }
}

const loginUsuario = () => ({
    type: LOGIN_USUARIO,
    payload: true
})

const loginUsuarioExito = (data_usuario) => ({
    type: LOGIN_USUARIO_EXITO,
    payload: data_usuario
})

const loginUsuarioError = mensaje => ({
    type: LOGIN_USUARIO_ERROR,
    payload: mensaje
})

export function confirmarUsuarioAction(token){
    return async (dispatch) => {
        dispatch(confirmarUsuario())

        try {

            await clienteAxios(`/usuarios/confirmar/${token}`)

            const mensaje = {
                msg: 'Usuario confirmado, ya puedes iniciar sesion',
                classes: 'bg-green-500 text-white font-bold w-full p-2 text-center my-3 rounded'
            }

            dispatch(confirmarUsuarioExito(mensaje))

            
        } catch (error) {
            console.log(error)
            const mensaje = {
                msg: error.response.data.msg,
                classes: 'bg-emerald-500 text-white font-bold w-full p-3 text-center rounded text-3xl'
            }
            dispatch(confirmarUsuarioError(mensaje))
        }
    }
}

const confirmarUsuario = () => ({
    type: CONFIRMAR_USUARIO,
    payload: true
})

const confirmarUsuarioExito = mensaje => ({
    type: CONFIRMAR_USUARIO_EXITO,
    payload: mensaje
})

const confirmarUsuarioError = mensaje => ({
    type: CONFIRMAR_USUARIO_ERROR,
    payload: mensaje
})

export function resetearMensajeAction(){
    return (dispatch) => {
        dispatch(resetearMensaje())

    }
}

const resetearMensaje = () => ({
    type: RESETEAR_MENSAJE,
    payload: null
})

export function cambiarPasswordAction (correo)  {
    return async (dispatch) => {

        dispatch(cambiarPassword())

        try {

            const { data } = await clienteAxios.post('/usuarios/recovery', correo)

            const mensaje = data.msg

            dispatch(cambiarPasswordExito())

            toast.success(mensaje, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
            })
            
        } catch (error) {
            
            console.log(error)

            const mensaje = {
                msg: error.response.data.msg,
                classes: 'bg-red-500 text-white font-bold w-full p-3 text-center rounded text-xl'
            }

            dispatch(cambiarPasswordError(mensaje))
        }
    }
}

const cambiarPassword = () => ({
    type: CAMBIAR_PASSWORD,
    payload: true
})

const cambiarPasswordExito = () => ({
    type: CAMBIAR_PASSWORD_EXITO,
})

const cambiarPasswordError = (mensaje) => ({
    type: CAMBIAR_PASSWORD_ERROR,
    payload: mensaje
})