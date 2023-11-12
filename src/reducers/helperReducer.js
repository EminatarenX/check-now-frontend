import {
    SET_ID_DEPARTAMENTO,
    SET_ID_CATEGORIA,
    SET_ID_EMPRESA,
    OBTENER_EMPLEADOS_EN_PLAZA,
    OBTENER_EMPLEADOS_EN_PLAZA_EXITO,
    OBTENER_EMPLEADOS_EN_PLAZA_ERROR
} from '../types'

const initialState = {
    empresa: null,
    departamento: null,
    categoria: null,
    empleado: null,
    mensaje: null,
    loading: false
}

export default function helperReducer ( state = initialState, action){
    switch(action.type){
        case OBTENER_EMPLEADOS_EN_PLAZA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                mensaje: null
            }
        case SET_ID_DEPARTAMENTO: 
            return {
                ...state,
                departamento: action.payload
            }
        case SET_ID_CATEGORIA:
            return {
                ...state,
                categoria: action.payload
            }
        case OBTENER_EMPLEADOS_EN_PLAZA:
            return {
                ...state,
                empleado: null,
                loading: action.payload,
                mensaje: null
            }
        case OBTENER_EMPLEADOS_EN_PLAZA_EXITO:
            return {
                ...state,
                empleado: action.payload,
                loading: false
            }

        
        
        default: 
            return state
    }
}