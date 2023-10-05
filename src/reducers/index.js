import { combineReducers } from "@reduxjs/toolkit";
import usuariosReducer from "./usuariosReducer"

export default combineReducers({
    usuarios: usuariosReducer
})