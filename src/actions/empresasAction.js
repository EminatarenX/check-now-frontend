import {
    ACTUALIZAR_DATOS_EMPRESA,
    ACTUALIZAR_DATOS_EMPRESA_EXITO,
    ACTUALIZAR_DATOS_EMPRESA_ERROR,
    OBTENER_DATOS_EMPRESA,
    OBTENER_DATOS_EMPRESA_EXITO,
    OBTENER_DATOS_EMPRESA_ERROR,
    OBTENER_DEPARTAMENTOS_EMPRESA,
    OBTENER_DEPARTAMENTOS_EMPRESA_EXITO,
    OBTENER_DEPARTAMENTOS_EMPRESA_ERROR,
    CREAR_DEPARTAMENTO,
    CREAR_DEPARTAMENTO_EXITO,
    CREAR_DEPARTAMENTO_ERROR,
    MODIFICAR_DEPARTAMENTO,
    MODIFICAR_DEPARTAMENTO_EXITO,
    MODIFICAR_DEPARTAMENTO_ERROR,
    ELIMINAR_DEPARTAMENTO,
    ELIMINAR_DEPARTAMENTO_EXITO,
    ELIMINAR_DEPARTAMENTO_ERROR

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
            dispatch(actualizarDatosEmpresaExito(data))
        } catch (error) {
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

export function obtenerDepartamentosAction () {
    return async (dispatch) => {
        dispatch(obtenerDepartamentos())

        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.get('/departamentos', config)

            dispatch(obtenerDepartamentosExito(data))

        } catch (error) {

            dispatch(obtenerDepartamentosError(error.response.data.msg))
            
        }
    }
}

const obtenerDepartamentos = () => ({
    type: OBTENER_DEPARTAMENTOS_EMPRESA,
    payload: true
})

const obtenerDepartamentosExito = (datos) => ({
    type: OBTENER_DEPARTAMENTOS_EMPRESA_EXITO,
    payload: datos.departamentos
})

const obtenerDepartamentosError = (error) => ({
    type: OBTENER_DEPARTAMENTOS_EMPRESA_ERROR,
    payload: error
})

export function crearDepartamentoAction (departamento) {
    return async (dispatch) => {
        dispatch( crearDepartamento() )

        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.post('/departamentos/crear', departamento, config)

            dispatch(crearDepartamentoExito(data.departamento))

            toast.success('Departamento creado correctamente')

        } catch (error) {
            console.log(error)
            dispatch(crearDepartamentoError(error.response.data.msg))
            toast.error('Error al crear el departamento')
        }
    }
}

const crearDepartamento = () => ({
    type: CREAR_DEPARTAMENTO,
    payload: true
})

const crearDepartamentoExito = (departamento) => {
    return {
        type: CREAR_DEPARTAMENTO_EXITO,
        payload: departamento
    }
}

const crearDepartamentoError = (error) => ({
    type: CREAR_DEPARTAMENTO_ERROR,
    payload: error
})

export function editarDepartamentoAction(body){
    return async (dispatch) => {
        dispatch(editarDepartamento())

        const { departamento, id } = body
        
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.put(`/departamentos/editar/${id}`, departamento, config)
            console.log(data)
            dispatch(editarDepartamentoExito(data.departamento))

            toast.success('Departamento editado correctamente')

        } catch (error) {
            console.log(error)
            dispatch(editarDepartamentoError(error.response.data.msg))
            toast.error('Error al editar el departamento')
        }
    }
}

const editarDepartamento = () => ({
    type: MODIFICAR_DEPARTAMENTO,
    payload: true
})

const editarDepartamentoExito = (departamento) => ({
    type: MODIFICAR_DEPARTAMENTO_EXITO,
    payload: departamento
})

const editarDepartamentoError = (error) => ({
    type: MODIFICAR_DEPARTAMENTO_ERROR,
    payload: error
})

export function eliminarDepartamentoAction(id) {
    return async (dispatch) => {
        dispatch(eliminarDepartamento())

        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            await clienteAxios.delete(`/departamentos/eliminar/${id}`, config)
            dispatch(eliminarDepartamentoExito(id))

            toast.success('Departamento eliminado correctamente')

        } catch (error) {
            console.log(error)
            dispatch(eliminarDepartamentoError(error.response.data.msg))
            toast.error('Error al eliminar el departamento')
        }
    }
}

const eliminarDepartamento = () => ({
    type: ELIMINAR_DEPARTAMENTO,
    payload: true
})

const eliminarDepartamentoExito = (id) => ({
    type: ELIMINAR_DEPARTAMENTO_EXITO,
    payload: id
})

const eliminarDepartamentoError = (error) => ({
    type: ELIMINAR_DEPARTAMENTO_ERROR,
    payload: error
})