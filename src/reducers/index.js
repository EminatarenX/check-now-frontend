import { combineReducers } from "@reduxjs/toolkit";
import usuariosReducer from "./usuariosReducer"
import empresasReducer from "./empresasReducer";
import helperReducer from "./helperReducer";

export default combineReducers({
    usuarios: usuariosReducer,
    empresa: empresasReducer,
    helper: helperReducer
})