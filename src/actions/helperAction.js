import {
    SET_ID_DEPARTAMENTO,
    SET_ID_CATEGORIA,
    SET_ID_EMPRESA,
    OBTENER_EMPLEADOS_EN_PLAZA,
    OBTENER_EMPLEADOS_EN_PLAZA_EXITO,
    OBTENER_EMPLEADOS_EN_PLAZA_ERROR
} from '../types'
import { toast } from 'react-toastify'
import clienteAxios from '../config/axios'

export function setDepartamentoAction(id){
    return (dispatch) => {
        dispatch(setDepartamento(id))
    }
}

const setDepartamento = (id) => ({
    type: SET_ID_DEPARTAMENTO,
    payload: id
})

export function setCategoriaAction(id){
    return (dispatch) => {
        dispatch(setCategoria(id))
    }
}

const setCategoria = (id) => ({
    type: SET_ID_CATEGORIA,
    payload: id
})


export function obtenerEmpleadosEnPlazaAction (id) {
    return async dispatch => {
        dispatch(obtenerEmpleadosEnPlaza())

        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers : {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {

            const { data } = await clienteAxios(`/empresas/empleados/${id}`, config)
            dispatch(obtenerEmpleadosEnPlazaExito(data.empleado))
            
        } catch (error) {
            dispatch(obtenerEmpleadosEnPlazaError(error))
        }
    }
}

const obtenerEmpleadosEnPlaza = () => ({
    type: OBTENER_EMPLEADOS_EN_PLAZA,
    payload: true
})

const obtenerEmpleadosEnPlazaExito = (empleado) => ({
    type: OBTENER_EMPLEADOS_EN_PLAZA_EXITO,
    payload: empleado
})

const obtenerEmpleadosEnPlazaError = (error) => ({
    type: OBTENER_EMPLEADOS_EN_PLAZA_ERROR,
    payload: error
})