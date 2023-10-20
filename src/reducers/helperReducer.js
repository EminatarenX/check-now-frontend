import {
    SET_ID_DEPARTAMENTO,
    SET_ID_CATEGORIA,
    SET_ID_EMPRESA
} from '../types'

const initialState = {
    empresa: null,
    departamento: null,
    categoria: null,

}

export default function helperReducer ( state = initialState, action){
    switch(action.type){
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
        
        
        default: 
            return state
    }
}