import {
    ACTUALIZAR_DATOS_EMPRESA,
    ACTUALIZAR_DATOS_EMPRESA_EXITO,
    ACTUALIZAR_DATOS_EMPRESA_ERROR,
    OBTENER_DATOS_EMPRESA,
    OBTENER_DATOS_EMPRESA_EXITO,
    OBTENER_DATOS_EMPRESA_ERROR

} from '../types'

import clienteAxios from "../config/axios";
import { toast } from "react-toastify";

// Actualizar datos de la empresa
export function actualizarDatosEmpresaAction(datos){
    return async (dispatch) => {
        dispatch(actualizarDatosEmpresa())

        const token = localStorage.getItem('token')
        if(!token) return 

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.post(`/empresas`, datos, config)
            toast.success('Datos de la empresa actualizados correctamente')
            console.log(data)
            dispatch(actualizarDatosEmpresaExito(data))
        } catch (error) {
            console.log(error)
            toast.error('Error al actualizar los datos de la empresa')
            dispatch(actualizarDatosEmpresaError())
        }
    }
}

const actualizarDatosEmpresa = () => ({
    type: ACTUALIZAR_DATOS_EMPRESA,
    payload: true
})

const actualizarDatosEmpresaExito = (datos) => ({
    type: ACTUALIZAR_DATOS_EMPRESA_EXITO,
    payload: datos.empresa
})

const actualizarDatosEmpresaError = () => ({
    type: ACTUALIZAR_DATOS_EMPRESA_ERROR,

})

export function obtenerDatosDeEmpresaAction(){
    return async (dispatch) => {
        dispatch(obtenerDatosEmpresa())

        const token = localStorage.getItem('token')
        if(!token) return 

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.get(`/empresas`, config)
            dispatch(obtenerDatosEmpresaExito(data))
        } catch (error) {
            console.log(error)
            dispatch(obtenerDatosEmpresaError())
        }
    }
}

const obtenerDatosEmpresa = () => ({
    type: OBTENER_DATOS_EMPRESA,
    payload: true
})

const obtenerDatosEmpresaExito = (datos) => ({
    type: OBTENER_DATOS_EMPRESA_EXITO,
    payload: datos.empresa
})

const obtenerDatosEmpresaError = () => ({
    type: OBTENER_DATOS_EMPRESA_ERROR,

})