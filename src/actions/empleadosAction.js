import {
    BUSCAR_PLAZA_USER,
    BUSCAR_PLAZA_USER_ERROR,
    BUSCAR_PLAZA_USER_EXITO,
    ACCEDER_EMPRESA,
    ACCEDER_EMPRESA_EXITO,
    ACCEDER_EMPRESA_ERROR,
    EMPLEADO_LOGIN,
    EMPLEADO_LOGIN_EXITO,
    EMPLEADO_LOGIN_ERROR,
    GET_EMPLEADO,
    GET_EMPLEADO_EXITO,
    GET_EMPLEADO_ERROR,
    REGISTRAR_ENTRADA_ERROR, 
    REGISTRAR_ENTRADA, 
    REGISTRAR_ENTRADA_EXITO,
    REGISTRAR_SALIDA,
    REGISTRAR_SALIDA_ERROR,
    REGISTRAR_SALIDA_EXITO,
} from '../types'
import { toast } from 'react-toastify'
import clienteAxios from '../config/axios'
import { io } from 'socket.io-client'
let socket = io(import.meta.env.VITE_BACKEND_URL)


export function buscarPlazaAction (id) {
    return async    dispatch => {
        dispatch(buscarEmpresa())

        const token = localStorage.getItem('token')
        if(!token) return dispatch(buscarEmpresaError('No hay token'))

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {

            const { data } =  await clienteAxios.get(`/plazas/buscar/${id}`, config)
            dispatch(buscarEmpresaExito(data.plaza))
            
        } catch (error) {
            dispatch(buscarEmpresaError(error))
            toast.error('No se pudo obtener la plaza')
        }
    }
}

const buscarEmpresa = () => ({
    type: BUSCAR_PLAZA_USER,
    payload: true
})

const buscarEmpresaExito = (empresa) => ({
    type: BUSCAR_PLAZA_USER_EXITO,
    payload: empresa
})

const buscarEmpresaError = (error) => ({
    type: BUSCAR_PLAZA_USER_ERROR,
    payload: error
})

export function accederEmpresaAction (empresa){
    return async (dispatch) => {
        dispatch(accederEmpresa())
        const token = localStorage.getItem("token")

        if(!token) return dispatch(accederEmpresaError('No hay token'))

        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {

            const { data } = await clienteAxios.post("/empleados/solicitud", empresa, config)
            socket.emit('solicitud', data.solicitud)
            dispatch(accederEmpresaExito(data.empresa))
            toast.success('Solicitud enviada con exito')

            
        } catch (error) {
            console.log(error)
            dispatch(accederEmpresaError(error))
            toast.error(error.response.data.msg)
        }
    }
}

const accederEmpresa = () =>({
    type: ACCEDER_EMPRESA,
    payload: true
})

const accederEmpresaExito = (empresa) => ({
    type: ACCEDER_EMPRESA_EXITO,
    payload: empresa
})

const accederEmpresaError = (error) => ({
    type: ACCEDER_EMPRESA_ERROR,
    payload: error
})

export function loginEmpleadoAction () {
    return async dispatch => {
        dispatch(loginEmpleado())

        const token = localStorage.getItem('token')
        if(!token) return dispatch(loginEmpleadoError('No hay token'))

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios('/empleados/getInfo', config)
           
            dispatch(loginEmpleadoExito(data.empleado))
        } catch (error) {
            
            dispatch(loginEmpleadoError(error))
        }
    }
}

const loginEmpleado = () => ({
    type: EMPLEADO_LOGIN,
    payload: true
})

const loginEmpleadoExito = (empleado) => ({
    type: EMPLEADO_LOGIN_EXITO,
    payload: empleado.empresa ? empleado : null
})

const loginEmpleadoError = (error) => ({
    type: EMPLEADO_LOGIN_ERROR,
    payload: error
})

export function getDatosEmpleadoAction (id) {
    return async dispatch => {
        dispatch(getEmpleado())

        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers : {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {

            const { data } = await clienteAxios.get(`/empleados/admin/${id}`, config)
            dispatch(getEmpleadoExito(data.empleado))
        } catch (error) {
            console.log(error)
            dispatch(getEmpleadoError(error))
        }
    }
}

const getEmpleado = () => ({
    type: GET_EMPLEADO,
    payload: true
})

const getEmpleadoExito = (empleado) => ({
    type: GET_EMPLEADO_EXITO,
    payload: empleado
})

const getEmpleadoError = (error) => ({
    type: GET_EMPLEADO_ERROR,
    payload: error
})

export function registrarEntradaAction (entrada) {
    return async dispatch => {
        dispatch(registrarEntrada())
        const token = localStorage.getItem('token')
        if(!token) toast.error('Su sesión expiro')

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {

            const { data } = await clienteAxios.post('/checks', entrada, config)
            toast.success('Entrada registrada!')
            dispatch(registrarEntradaExito(data.check))
            socket.emit('nueva entrada', data.check)
            
        } catch (error) {
            
            toast.error(error.response.data.msg)
            dispatch(registrarEntradaError(error.response.data.msg))
        }
    }

}

const registrarEntrada = () => ({
    type: REGISTRAR_ENTRADA,
    payload: true
})

const registrarEntradaExito = (entrada) => ({
    type: REGISTRAR_ENTRADA_EXITO,
    payload: entrada
})

const registrarEntradaError = (error) => ({
    type: REGISTRAR_ENTRADA_ERROR,
    payload: error
})

export function registrarSalidaAction () {
    return async dispatch => {
        dispatch(registrarSalida())
        const token = localStorage.getItem('token')
        if(!token) toast.error('Su sesión expiro')

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {

            const { data } = await clienteAxios('/checks/salida', config)
            toast.success('Salida registrada!')
            dispatch(registrarSalidaExito(data.check))
            
            
        } catch (error) {
            
            toast.error(error.response.data.msg)
            dispatch(registrarSalidaError(error))
        }
    }
}

const registrarSalida = () => ({
    type: REGISTRAR_SALIDA,
    payload: true
})

const registrarSalidaExito = (salida) => ({
    type: REGISTRAR_SALIDA_EXITO,
    payload: salida
})

const registrarSalidaError = (error) => ({
    type: REGISTRAR_SALIDA_ERROR,
    payload: error
})