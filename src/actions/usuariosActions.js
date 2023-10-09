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
    CAMBIAR_PASSWORD_ERROR,
    RECOVERY_PASSWORD,
    RECOVERY_PASSWORD_EXITO,
    RECOVERY_PASSWORD_ERROR,
    OBTENER_PERFIL,
    OBTENER_PERFIL_EXITO,
    OBTENER_PERFIL_ERROR,
    NUEVO_USUARIO_DATOS,
    NUEVO_USUARIO_DATOS_EXITO,
    NUEVO_USUARIO_DATOS_ERROR
} from '../types'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

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

            window.location.reload()

            
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
            console.log(mensaje)
            dispatch(cambiarPasswordExito())

            toast.success(mensaje.cuerpo, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            
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
    payload: false
})

const cambiarPasswordError = (mensaje) => ({
    type: CAMBIAR_PASSWORD_ERROR,
    payload: mensaje
})

export function recoveryPasswordAction (body)  {
    return async (dispatch) => {

        dispatch(recoveryPassword())

        const { token, password } = body

        try {

            const { data } = await clienteAxios.put(`/usuarios/recovery/${token}`, { password })

            const mensaje = data.msg
            console.log(mensaje)
            dispatch(recoveryPasswordExito())

            toast.success(mensaje.cuerpo, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            
        } catch (error) {
            
            console.log(error)

            const mensaje = {
                msg: error.response.data.msg,
                classes: 'bg-red-500 text-white font-bold w-full p-3 text-center rounded text-xl'
            }

            dispatch(recoveryPasswordError(mensaje))
        }
    }
}

const recoveryPassword = () => ({
    type: RECOVERY_PASSWORD,
    payload: true
})

const recoveryPasswordExito = () => ({
    type: RECOVERY_PASSWORD_EXITO,
    payload: false
})

const recoveryPasswordError = (mensaje) => ({
    type: RECOVERY_PASSWORD_ERROR,
    payload: mensaje
})


export function obtenerPerfilAction(token) {
    return async (dispatch) => {
        dispatch(obtenerPerfil())
        

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {

            const { data } = await clienteAxios('/usuarios/perfil', config)


            dispatch(obtenerPerfilExito(data))

        }catch(error){
            console.log(error)

            dispatch(obtenerPerfilError(error.response.data.msg))
        }
    }
}

const obtenerPerfil = () => ({
    type: OBTENER_PERFIL,
    payload: true
})

const obtenerPerfilExito = (data) => ({
    type: OBTENER_PERFIL_EXITO,
    payload: data
})

const obtenerPerfilError = (mensaje) => ({
    type: OBTENER_PERFIL_ERROR,
    payload: mensaje
})

export function formularioNuevoUsuarioAction(usuario){
    return async (dispatch) => {
        dispatch(formularioNuevoUsuario())

        const token = localStorage.getItem('token')

        if(!token) return

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {

            const { data } = await clienteAxios.post("/usuarios/registrar-datos", usuario, config)
            console.log(data)
            toast.success("Seras direccionado a un panel nuevo", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
                dispatch(formularioNuevoUsuarioExito())

            setTimeout(() => {
                
                window.location.reload()
            }, 1500);
            
        } catch (error) {
            console.log(error)
            const mensaje = {
                msg: error.response.data.msg,
                classes: 'bg-red-500 text-white font-bold w-full p-2 text-center my-3 rounded',
                error: true
            }
            toast.error(mensaje.msg)
            dispatch(formularioNuevoUsuarioError(mensaje))

        }
    }
}

const formularioNuevoUsuario = () => ({
    type: NUEVO_USUARIO_DATOS,
    payload: true
})

const formularioNuevoUsuarioExito = () => ({
    type: NUEVO_USUARIO_DATOS_EXITO,
    payload: false
})

const formularioNuevoUsuarioError = (mensaje) => ({
    type: NUEVO_USUARIO_DATOS_ERROR,
    payload: mensaje
})

export function cerrarSesionAction () {
    return (dispatch) => {

        localStorage.removeItem('token')

        toast.success('Sesion cerrada correctamente')
        dispatch(cerrarSesion())
    }
}

const cerrarSesion = () => ({
    type: 'CERRAR_SESION',
    payload: null
})