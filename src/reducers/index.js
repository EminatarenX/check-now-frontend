import { combineReducers } from "@reduxjs/toolkit";
import usuariosReducer from "./usuariosReducer"
import empresasReducer from "./empresasReducer";
import helperReducer from "./helperReducer";
import empleadosReducer from "./empleadosReducer";

export default combineReducers({
    empresa: empresasReducer,
    empleado: empleadosReducer,
    usuarios: usuariosReducer,
    helper: helperReducer
})