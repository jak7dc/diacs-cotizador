import './styles/index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/inicio/Login";
import { Register } from "./pages/inicio/Register";
import { Home } from "./pages/Home";
import { ProtectedRoute } from './components/ProtectedRoute';
import { Category } from './pages/inventary/Category.jsx'

export const App = () => {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* RUTAS PROTEGIDAS DE INICIO DE SESION */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path='/category' element={<Category />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}
