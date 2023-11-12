import {
    BUSCAR_PLAZA_USER,
    BUSCAR_PLAZA_USER_ERROR,
    BUSCAR_PLAZA_USER_EXITO,
    ACCEDER_EMPRESA,
    ACCEDER_EMPRESA_EXITO,
    ACCEDER_EMPRESA_ERROR,
    EMPLEADO_LOGIN,
    EMPLEADO_LOGIN_EXITO,
    EMPLEADO_LOGIN_ERROR
} from '../types'
import { toast } from 'react-toastify'
import clienteAxios from '../config/axios'
import socket from '../helpers/socket'


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
            socket.emit('enviar solicitud', data.solicitud)
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
            console.log(error)
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