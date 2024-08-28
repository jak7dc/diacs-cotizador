import './styles/index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/inicio/Login";
import { Register } from "./pages/inicio/Register";
import { Home } from "./pages/Home";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
