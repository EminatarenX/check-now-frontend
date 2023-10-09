import { 
    REGISTRAR_USUARIO,
    REGISTRAR_USUARIO_EXITO,
    REGISTRAR_USUARIO_ERROR,
    LOGIN_USUARIO,
    LOGIN_USUARIO_EXITO,
    LOGIN_USUARIO_ERROR,
    CONFIRMAR_USUARIO,
    CONFIRMAR_USUARIO_EXITO,
    CONFIRMAR_USUARIO_ERROR,
    RESETEAR_MENSAJE,
    CAMBIAR_PASSWORD,
    CAMBIAR_PASSWORD_EXITO,
    CAMBIAR_PASSWORD_ERROR,
    RECOVERY_PASSWORD,
    RECOVERY_PASSWORD_EXITO,
    RECOVERY_PASSWORD_ERROR,
    OBTENER_PERFIL,
    OBTENER_PERFIL_EXITO,
    OBTENER_PERFIL_ERROR,
    NUEVO_USUARIO_DATOS,
    NUEVO_USUARIO_DATOS_EXITO,
    NUEVO_USUARIO_DATOS_ERROR

} from '../types/index'

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error : null
}

export default function usuariosReducer(state = initialState, action){
    switch(action.type){
        case REGISTRAR_USUARIO_ERROR: 
        case LOGIN_USUARIO_ERROR:
        case CONFIRMAR_USUARIO_ERROR:
        case CAMBIAR_PASSWORD_ERROR:
        case RECOVERY_PASSWORD_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
                
            }
        case REGISTRAR_USUARIO:
            return {
                ...state,
                loading: action.payload,
                error: null
            }
        case REGISTRAR_USUARIO_EXITO:
            return {
                ...state, 
                loading: false,
                
            }

        case LOGIN_USUARIO: 
            return {
                ...state,
                loading: action.payload,
                error: null
            }
        case LOGIN_USUARIO_EXITO: 
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case CONFIRMAR_USUARIO: 
            return {
                ...state,
                loading: action.payload,
                error: null
            }
        case CONFIRMAR_USUARIO_EXITO:
            return {
                ...state,
                loading: false,
                
            }
        case RESETEAR_MENSAJE: 
            return {
                ...state,
                error: null
            }
        case CAMBIAR_PASSWORD: 
            return {
                ...state,
                error: null,
                loading: action.payload
            }
        case CAMBIAR_PASSWORD_EXITO:
            return {
                ...state,
                loading: action.payload
                
            }

        case RECOVERY_PASSWORD: 
            return {
                ...state,
                loading: true,
                error: null
            }
        case RECOVERY_PASSWORD_EXITO:
            return {
                ...state,
                loading: false,
            }
        case OBTENER_PERFIL:
            return {
                ...state,
                error: null
            }
        case OBTENER_PERFIL_EXITO:
            return {
                ...state,
                loading: false,
                user: action.payload.usuario,
                isAuthenticated: true
            }
        case OBTENER_PERFIL_ERROR:
            return {
                ...state,
                loading: false,
                user: null,
                isAuthenticated: false
            }
        case NUEVO_USUARIO_DATOS:
            return {
                ...state,
                loading: true,
                error: null
            }
        case NUEVO_USUARIO_DATOS_EXITO:
            return {
                ...state,
                loading: action.payload,
                error: null
            }
        case NUEVO_USUARIO_DATOS_ERROR:
            return {
                ...state,
                loading: false,
                
            }
        case 'CERRAR_SESION':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                loading: false,
                error : null
            }
        
        default: 
            return state;
    }
}