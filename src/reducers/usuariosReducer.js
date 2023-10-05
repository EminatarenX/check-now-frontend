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
    RESETEAR_MENSAJE

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
        
        default: 
            return state;
    }
}