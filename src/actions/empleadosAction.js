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
            console.log(data.plaza)
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
        const token = localStorage.getItem("token")

        if(!token) return dispatch(accederEmpresaError('No hay token'))

        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {

            const { data } = await clienteAxios.post("/empleados/acceder", empresa, config)

            dispatch(accederEmpresaExito(data.empresa))
            toast.success('Bienvenido')

            setTimeout(() => {
                window.location.reload()
            }, 1500);
            
        } catch (error) {
            console.log(error)
            dispatch(accederEmpresaError(error))
            toast.error('Hubo un error, intentalo mas tarde')
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
    payload: empleado
})

const loginEmpleadoError = (error) => ({
    type: EMPLEADO_LOGIN_ERROR,
    payload: error
})