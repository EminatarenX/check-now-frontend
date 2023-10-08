import {
    ACTUALIZAR_DATOS_EMPRESA,
    ACTUALIZAR_DATOS_EMPRESA_EXITO,
    ACTUALIZAR_DATOS_EMPRESA_ERROR,
    OBTENER_DATOS_EMPRESA,
    OBTENER_DATOS_EMPRESA_EXITO,
    OBTENER_DATOS_EMPRESA_ERROR

} from '../types'

const initialState = {
    datos: null,
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
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        
        default: 
            return state
    }
}