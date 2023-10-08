import { combineReducers } from "@reduxjs/toolkit";
import usuariosReducer from "./usuariosReducer"
import empresasReducer from "./empresasReducer";

export default combineReducers({
    usuarios: usuariosReducer,
    empresa: empresasReducer
})