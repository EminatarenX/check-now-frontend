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

const initialState = {
    datos: null,
    departamentos: [],
    nominas: [],
    empleados: [],
    loading: false,
    error: null,
    mensaje: null
}

export default function empresasReducer( state = initialState, action){
    switch( action.type) {
        case ACTUALIZAR_DATOS_EMPRESA:
            return {
                ...state,
                loading: action.payload,
                error: null
            }
        case ACTUALIZAR_DATOS_EMPRESA_EXITO:
            return {
                ...state,
                loading: false,
                datos: action.payload
            }
        case OBTENER_DATOS_EMPRESA:
            return {
                ...state,
                loading: true,
                error: null,
                mensaje: null
            }
        case OBTENER_DATOS_EMPRESA_EXITO:
            return {
                ...state,
                loading: false,
                datos: action.payload
            }
        case ACTUALIZAR_DATOS_EMPRESA_ERROR:
        case OBTENER_DATOS_EMPRESA_ERROR:
        case OBTENER_DEPARTAMENTOS_EMPRESA_ERROR:
        case CREAR_DEPARTAMENTO_ERROR:
        case MODIFICAR_DEPARTAMENTO_ERROR:
        case ELIMINAR_DEPARTAMENTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case OBTENER_DEPARTAMENTOS_EMPRESA:
            return {
                ...state,
                loading: action.payload,
                error: null,
                mensaje: null
            }
        case OBTENER_DEPARTAMENTOS_EMPRESA_EXITO:
            return {
                ...state,
                loading: false,
                departamentos: action.payload
            }
        case CREAR_DEPARTAMENTO: 
            return {
                ...state,
                loading: action.payload,
                error: null,
                mensaje: null
            }
        case CREAR_DEPARTAMENTO_EXITO:
            return {
                ...state,
                loading: false,
                departamentos: [...state.departamentos, action.payload]
            }
        case MODIFICAR_DEPARTAMENTO:
            return {
                ...state,
                loading: action.payload,
                error: null,
                mensaje: null
            }
        case MODIFICAR_DEPARTAMENTO_EXITO:
            return {
                ...state, 
                loading: false,
                departamentos: state.departamentos.map(departamento =>
                   departamento._id === action.payload._id ? departamento = action.payload : departamento
                )                  
            }
        case ELIMINAR_DEPARTAMENTO:
            return {
                ...state,
                loading: action.payload,
                error: null,
                mensaje: null
            }
        case ELIMINAR_DEPARTAMENTO_EXITO:
            return {
                ...state,
                loading: false,
                departamentos: state.departamentos.filter(departamento => departamento._id !== action.payload)
            }
        
        default: 
            return state
    }
}