import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import store from './store'
import Registrar from './pages/Registrar'
import Inicio from './pages/Inicio'
import InicioLayout from './components/InicioLayout'
import IniciarSesion from './pages/IniciarSesion'
import ConfirmarCuenta from './pages/ConfirmarCuenta'

function App() {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<InicioLayout />}>
            <Route index element={<Inicio/>} />
            <Route path='/registro' element={<Registrar/>} />
            <Route path='/login' element={<IniciarSesion/>} />
            <Route path='/confirmar/:token' element={<ConfirmarCuenta/>} />
          </Route>
        </Routes>
      </Provider>
    
    </BrowserRouter>
  )
}

export default App
