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
    ELIMINAR_CATEGORIA_DEPARTAMENTO_EXITO,
    ELIMINAR_CATEGORIA_DEPARTAMENTO_ERROR,
    AGREGAR_PLAZA,
    AGREGAR_PLAZA_EXITO,
    AGREGAR_PLAZA_ERROR,
    OBTENER_PLAZAS,
    OBTENER_PLAZAS_EXITO,
    OBTENER_PLAZAS_ERROR,
    GET_PLAZA_BY_ID,
    GET_PLAZA_BY_ID_ERROR,
    GET_PLAZA_BY_ID_EXITO,
    GET_SOLICITUDES,
    GET_SOLICITUDES_EXITO,
    GET_SOLICITUDES_ERROR,
    RECHAZAR_SOLICITUD,
    RECHAZAR_SOLICITUD_ERROR,
    RECHAZAR_SOLICITUD_EXITO,
    ACEPTAR_SOLICITUD,
    ACEPTAR_SOLICITUD_EXITO,
    ACEPTAR_SOLICITUD_ERROR

} from '../types'

const initialState = {
    datos: null,
    departamentos: [],
    nominas: [],
    empleados: [],
    solicitudes: [],
    categorias: [],
    plazas: [], 
    plazaActual: null,
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
        case CREAR_CATEGORIA_DEPARTAMENTO_ERROR:
        case ELIMINAR_CATEGORIA_DEPARTAMENTO_ERROR:
        case AGREGAR_PLAZA_ERROR:
        case OBTENER_PLAZAS_ERROR:
        case GET_PLAZA_BY_ID_ERROR:
        case GET_SOLICITUDES_ERROR:
        case RECHAZAR_SOLICITUD_ERROR:
        case ACEPTAR_SOLICITUD_ERROR:
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
        case CREAR_CATEGORIA_DEPARTAMENTO:
            return {
                ...state,
                loading: action.payload,
                error: null,
                mensaje: null
            }
        case CREAR_CATEGORIA_DEPARTAMENTO_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                categorias: [...state.categorias, action.payload]
            }
        case OBTENER_CATEGORIAS_DEPARTAMENTO:
            return {
                ...state,
                loading: action.payload,
                error: null,
                mensaje: null,
                plazas: []
            }
        case OBTENER_CATEGORIAS_DEPARTAMENTO_EXITO:
            return {
                ...state, 
                loading: false,
                error: null,
                categorias: action.payload
            }
        case ELIMINAR_CATEGORIA_DEPARTAMENTO:
            return {
                ...state,
                loading: action.payload,
                error: null,
                mensaje: null
            }
        case ELIMINAR_CATEGORIA_DEPARTAMENTO_EXITO: 
            return {
                ...state,
                loading: false,
                error: null,
                mensaje: null,
                categorias: state.categorias.filter(categoria => 
                    categoria._id !== action.payload
                )
            }
            case OBTENER_CATEGORIAS_DEPARTAMENTO_ERROR:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                    mensaje: null,
                    categorias: []
                }
            case AGREGAR_PLAZA:
                return {
                    ...state,
                    loading: action.payload,
                    error: null,
                    mensaje: null,
                }
            case AGREGAR_PLAZA_EXITO: 
                return {
                    ...state,
                    loading: false,
                    plazas: [...state.plazas, action.payload]
                }
            case OBTENER_PLAZAS:
                return {
                    ...state,
                    loading: action.payload,
                    error: null,
                    mensaje: null,
                }
            case OBTENER_PLAZAS_EXITO:
                return {
                    ...state,
                    loading: false,
                    plazas: action.payload
                }
            case GET_PLAZA_BY_ID:
                return {
                    ...state,
                    loading: true,
                    error: null,
                    mensaje: null,
                }
            case GET_PLAZA_BY_ID_EXITO:
                return {
                    ...state,
                    loading: false,
                    plazaActual: action.payload
                }
            case GET_SOLICITUDES:
                return {
                    ...state,
                    loading: true,
                    error: null,
                    mensaje: null,
                }
            case GET_SOLICITUDES_EXITO:
                return { 
                    ...state,
                    loading: false,
                    solicitudes: action.payload

                }
            case RECHAZAR_SOLICITUD:
                return {
                    ...state,
                    loading: true,
                    error: null,
                    mensaje: null,
                }
            case RECHAZAR_SOLICITUD_EXITO:
                return {
                    ...state,
                    loading: false,
                    solicitudes: state.solicitudes.filter(solicitud => solicitud._id !== action.payload)
                }
            case ACEPTAR_SOLICITUD:
                return {
                    ...state,
                    loading: true,
                    error: null,
                    mensaje: null,
                }
            case ACEPTAR_SOLICITUD_EXITO:
                return {
                    ...state,
                    loading: false,
                    solicitudes: state.solicitudes.filter(solicitud => solicitud._id !== action.payload)
                }

            
        default: 
            return state
    }
}