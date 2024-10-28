import React from 'react'
import '../../styles/general/navBar.css'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../providers/UserContext'
import { useNavigate } from 'react-router-dom'

export const SideBar = () => {
  const [userActions] = useUserContext()
  const navigate = useNavigate()

  const logout = () => {
    userActions.userClear()
    navigate('/')
  }

  return (
    <nav className='navleft'>
      <ul className='ul-navleft'>
        <li>
          <p className='sbar-title'>lista de items de inventario</p>
          <ul className='sbar-subul'>
            <li><Link className='sbar-link' to={'/products'}>items de cobro</Link></li>
            <li><Link className='sbar-link' to='/category'>Categorias</Link></li>
          </ul>
        </li>
        <li>
          <p className='sbar-title'>Cotizar</p>
          <ul className='sbar-subul'>
            <li><Link className='sbar-link' to={'/cotizador'}>Cotizar</Link></li>
            <li><Link className='sbar-link' to={'/cotizadorListaPrecios'}>lista de precios</Link></li>
          </ul>
        </li>
        <li>
          <p className='sbar-title'>Contactos</p>
          <ul className='sbar-subul'>
            <li><Link className='sbar-link' to={'/clients'}>Clientes</Link></li>
          </ul>
        </li>
      </ul>
      <div className='sbar-foot'>
        <button onClick={logout}>Cerrar Sesion</button>
      </div>
    </nav>
  )
}
