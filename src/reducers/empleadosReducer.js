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
    GET_EMPLEADO_ERROR
} from '../types'

const initialState = {
    id: null,
    datos: null,
    empresa: null,
    plaza: null,
    entradas: [],
    salidas: [],
    buscarPlaza:null,
    loading: false,
    error: null,
    solicitud: null
}

export default function empleadosReducer ( state = initialState, action){
    switch (action.type){
        case ACCEDER_EMPRESA_ERROR:
        case BUSCAR_PLAZA_USER_ERROR:     
        case EMPLEADO_LOGIN_ERROR:
        case GET_EMPLEADO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case BUSCAR_PLAZA_USER:
            return {
                ...state, 
                loading: action.payload,
            }
        case BUSCAR_PLAZA_USER_EXITO:
            return {
                ...state,
                loading: false,
                buscarPlaza: action.payload,
                error: null
            }
        case ACCEDER_EMPRESA:
            return {
                ...state,
                loading: action.payload,
            }

        case ACCEDER_EMPRESA_EXITO:
            return {
                ...state,
                loading: false,
                solicitud: action.payload,
                error: null
            }
        case EMPLEADO_LOGIN:
            return {
                ...state,
                loading: action.payload,
            }
        case EMPLEADO_LOGIN_EXITO:
            return {
                ...state,
                loading: false,
                empresa: action.payload ? action.payload.empresa : null,
                plaza: action.payload ? action.payload.plaza : null,
                id: action.payload ? action.payload._id : null,
                error: null
            }
        case GET_EMPLEADO:
            return {
                ...state,
                loading: action.payload,
                error: null
            }
        case GET_EMPLEADO_EXITO:
            return {
                ...state,
                loading: false,
                datos: action.payload,

            }
        default: 
            return state
    }
}