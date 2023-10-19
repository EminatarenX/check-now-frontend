import {
    SET_ID_DEPARTAMENTO,
    SET_ID_CATEGORIA,
    SET_ID_EMPRESA
} from '../types'

export function setCategoriaAction(id){
    return (dispatch) => {
        dispatch(setCategoria(id))
    }
}

const setCategoria = (id) => ({
    type: SET_ID_CATEGORIA,
    payload: id
})