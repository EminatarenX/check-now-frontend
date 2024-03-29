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
    ACEPTAR_SOLICITUD_ERROR,
    OBTENER_EMPLEADOS,
    OBTENER_EMPLEADOS_ERROR,
    OBTENER_EMPLEADOS_EXITO,
    EDITAR_PLAZA,
    EDITAR_PLAZA_ERROR,
    EDITAR_PLAZA_EXITO,
    ELIMINAR_PLAZA,
    ELIMINAR_PLAZA_ERROR,
    ELIMINAR_PLAZA_EXITO,
    GET_EMPLEADO,
    GET_EMPLEADO_ERROR,
    GET_EMPLEADO_EXITO,
    GET_CHECKS_ADMIN,
    GET_CHECKS_ADMIN_ERROR,
    GET_CHECKS_ADMIN_EXITO,
    GENERAR_NOMINA,
    GENERAR_NOMINA_ERROR,
    GENERAR_NOMINA_EXITO,
    OBTENER_NOMINAS_EMPRESA,
    OBTENER_NOMINAS_EMPRESA_ERROR,
    OBTENER_NOMINAS_EMPRESA_EXITO,
    ELIMINAR_NOMINA_EMPLEADO,
    ELIMINAR_NOMINA_EMPLEADO_ERROR,
    ELIMINAR_NOMINA_EMPLEADO_EXITO

} from '../types'

const initialState = {
    datos: null,
    departamentos: [],
    nominas: [],
    empleados: [],
    solicitudes: [],
    categorias: [],
    plazas: [], 
    checks: [],
    empleadoActual: null,
    plazaActual: null,
    loading: false,
    loadingNomina: false,
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
        case OBTENER_EMPLEADOS_ERROR:
        case EDITAR_PLAZA_ERROR:
        case ELIMINAR_PLAZA_ERROR:
        case GET_EMPLEADO_ERROR:
        case GET_CHECKS_ADMIN_ERROR:
        case GENERAR_NOMINA_ERROR:
        case ELIMINAR_NOMINA_EMPLEADO_ERROR:
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
            case OBTENER_EMPLEADOS:
                return {
                    ...state,
                    loading: true,
                    error: null,
                }
            case OBTENER_EMPLEADOS_EXITO:
                return {
                    ...state,
                    loading: false,
                    empleados: action.payload
                }
            case "NUEVA_SOLICITUD_SOCKET":
                const existeSolicitud = state.solicitudes.find(solicitud => {
                    return solicitud._id === action.payload._id
                })
                if(existeSolicitud) return state
                
                return {
                    ...state,
                    solicitudes: [action.payload, ...state.solicitudes]
                }
            case EDITAR_PLAZA:
                return {
                    ...state,
                    loading: true,
                    error: null,
                }
            case EDITAR_PLAZA_EXITO:
                return {
                    ...state,
                    loading: false,
                    plazaActual: action.payload,

                }
            case ELIMINAR_PLAZA:
                return {
                    ...state,
                    loading: true,
                    error: null,
                }
            case ELIMINAR_PLAZA_EXITO:
                return {
                    ...state,
                    loading: false,
                    plazas: state.plazas.filter(plaza => plaza._id !== action.payload)
                }
            case GET_EMPLEADO:
                return {
                    ...state,
                    loading: action.payload,
                    empleadoActual: null,
                    error: null,
                }
            case GET_EMPLEADO_EXITO:
                return {
                    ...state,
                    loading: false,
                    empleadoActual: action.payload
                }
            case GET_CHECKS_ADMIN: 
                return {
                    ...state,
                    loading: action.payload,
                    error: null
                }
            case GET_CHECKS_ADMIN_EXITO: 
                return {
                    ...state,
                    loading: false,
                    checks: action.payload
                }
            case 'NUEVO_CHECK_SOCKET':
                const existeCheck = state.checks.find(check => check._id === action.payload._id)
                if(existeCheck) return state
                return {
                    ...state,
                    checks: [action.payload,...state.checks]
                }
            case GENERAR_NOMINA:
                return {
                    ...state,
                    loading: true,
                    error: null
                }
            case GENERAR_NOMINA_EXITO:
                return {
                    ...state,
                    loading: false,
                    nominas: [...state.nominas, action.payload]
                }
            case OBTENER_NOMINAS_EMPRESA:
                return {
                    ...state,
                    loadingNomina: action.payload,
                    error: null
                }
            case OBTENER_NOMINAS_EMPRESA_EXITO:
                return {
                    ...state,
                    loadingNomina: false,
                    nominas: action.payload
                }
            case OBTENER_NOMINAS_EMPRESA_ERROR:
                return {
                    ...state,
                    loadingNomina: false,
                    error: action.payload,
                    mensaje: action.payload.response.data.msg
                }
            case ELIMINAR_NOMINA_EMPLEADO:
                return {
                    ...state,
                    loading: action.payload,
                    error: null,
                    mensaje: null
                }
                
            case ELIMINAR_NOMINA_EMPLEADO_EXITO:
                return {
                    ...state,
                    loading: false,
                    nominas: state.nominas.filter(nomina => nomina._id !== action.payload)
                }
        default: 
            return state
    }
}