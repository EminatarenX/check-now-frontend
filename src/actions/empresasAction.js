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
    ELIMINAR_DEPARTAMENTO_ERROR,
    CREAR_CATEGORIA_DEPARTAMENTO,
    CREAR_CATEGORIA_DEPARTAMENTO_EXITO,
    CREAR_CATEGORIA_DEPARTAMENTO_ERROR,
    OBTENER_CATEGORIAS_DEPARTAMENTO,
    OBTENER_CATEGORIAS_DEPARTAMENTO_ERROR,
    OBTENER_CATEGORIAS_DEPARTAMENTO_EXITO,
    ELIMINAR_CATEGORIA_DEPARTAMENTO,
    ELIMINAR_CATEGORIA_DEPARTAMENTO_ERROR,
    ELIMINAR_CATEGORIA_DEPARTAMENTO_EXITO,
    AGREGAR_PLAZA,
    AGREGAR_PLAZA_ERROR,
    AGREGAR_PLAZA_EXITO,
    OBTENER_PLAZAS,
    OBTENER_PLAZAS_ERROR,
    OBTENER_PLAZAS_EXITO,
    GET_PLAZA_BY_ID,
    GET_PLAZA_BY_ID_ERROR,
    GET_PLAZA_BY_ID_EXITO

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


export function crearCategoriaAction(body) {
    return async (dispatch) => {

        dispatch(crearCategoria())

        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.post('/categorias/crear', body, config)
            dispatch(crearCategoriaExito(data.categoria))
            toast.success('Categoria agregada')
            
        } catch (error) {
            dispatch(crearCategoriaError(error.response.data.msg))
            toast.error('Error al crear la categoria')
        }
    }
}

const crearCategoria = () => ({
    type: CREAR_CATEGORIA_DEPARTAMENTO,
    payload: true
})

const crearCategoriaExito = (categoria) => ({
    type: CREAR_CATEGORIA_DEPARTAMENTO_EXITO,
    payload: categoria
})

const crearCategoriaError = (error) => ({
    type: CREAR_CATEGORIA_DEPARTAMENTO_ERROR,
    payload: error
})

export function obtenerCategoriasAction (id) {
    return async (dispatch) => {
        dispatch(obtenerCategorias())

        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {

            const { data } = await clienteAxios(`/categorias/${id}`, config)

            dispatch(obtenerCategoriasExito(data.categorias))
            
        } catch (error) {
            dispatch(obtenerCategoriasError(error.response.data.msg))
            toast.warning(error.response.data.msg)
        }
    }
}
const obtenerCategorias = () => ({
    type: OBTENER_CATEGORIAS_DEPARTAMENTO,
    payload: true
})

const obtenerCategoriasExito = (categorias) => ({
    type: OBTENER_CATEGORIAS_DEPARTAMENTO_EXITO,
    payload: categorias
})

const obtenerCategoriasError = (error) => ({
    type: OBTENER_CATEGORIAS_DEPARTAMENTO_ERROR,
    payload: error
})

export function eliminarCategoriaDepartamentoAction(id) {
    return async (dispatch) => {
        dispatch(eliminarCategoria())

        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        
        try {
            await clienteAxios.delete(`/categorias/eliminar/${id}`, config)
            dispatch(eliminarCategoriaExito(id))
            toast.success('Categoria eliminada correctamente')
        } catch (error) {
            dispatch(eliminarCategoriaError(error.response.data.msg))
            toast.error('Error al eliminar la categoria')
        }
    }
}

const eliminarCategoria = () => ({
    type: ELIMINAR_CATEGORIA_DEPARTAMENTO,
    payload: true
})

const eliminarCategoriaExito = (id) => ({
    type: ELIMINAR_CATEGORIA_DEPARTAMENTO_EXITO,
    payload: id
})

const eliminarCategoriaError = (error) => ({
    type: ELIMINAR_CATEGORIA_DEPARTAMENTO_ERROR,
    payload: error
})

export function agregarPlazaAction (plaza) {
    return async dispatch => {
        dispatch(agregarPlaza())
        const token = localStorage.getItem('token')
        if(!token) return 

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {

            const { data } = await clienteAxios.post('/plazas/crear', plaza, config)
            dispatch(agregarPlazaExito(data.plaza))
            toast.success("Plaza agregada")
            
        } catch (error) {
            console.log(error)
            dispatch(agregarPlazaError())
            toast.error(error.response.data.msg)
        }
    }
}

const agregarPlaza = () => ({
    type: AGREGAR_PLAZA,
    payload: true
})

const agregarPlazaExito = (plaza) => ({
    type: AGREGAR_PLAZA_EXITO,
    payload: plaza
})

const agregarPlazaError = (error) => ({
    type: AGREGAR_PLAZA_ERROR,
    payload: error
})

export function obtenerPlazasAction (id) {
    return async dispatch => {
        dispatch(obtenerPlazas())
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {

            const { data } = await clienteAxios(`/plazas/${id}`, config)
            dispatch(obtenerPlazasExito(data.plazas))

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
            dispatch(obtenerPlazasError(error))

        }
    }
}

const obtenerPlazas = () => ({
    type: OBTENER_PLAZAS,
    payload: true
})

const obtenerPlazasExito = (plazas) => ({
    type: OBTENER_PLAZAS_EXITO,
    payload: plazas
})

const obtenerPlazasError = (error) => ({
    type: OBTENER_PLAZAS_ERROR,
    payload: error
})

export function obtenerPlazaAction(id) {
    return async dispatch => {
        dispatch(getPlaza())

        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios(`/plazas/plaza/${id}`, config)
            dispatch(getPlazaExito(data.plaza))

        } catch (error) {
            toast.error(error.response.data.msg)
            dispatch(getPlazaError(error))
        }
    }
}

const getPlaza = () => ({
    type: GET_PLAZA_BY_ID,
    payload: true
})

const getPlazaExito = (plaza) => ({
    type: GET_PLAZA_BY_ID_EXITO,
    payload: plaza
})

const getPlazaError = (error) => ({
    type: GET_PLAZA_BY_ID_ERROR,
    payload: error
})