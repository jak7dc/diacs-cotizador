import React from 'react'
import '../../styles/general/navBar.css'
import { Link } from 'react-router-dom'

export const SideBar = () => {
  return (
    <nav className='navleft'>
      <ul className='ul-navleft'>
        <li>
          <p>lista de items de inventario</p>
          <ul>
            <li><Link to={'/products'}>items de cobro</Link></li>
            <li><Link to='/category'>Categorias</Link></li>
          </ul>
        </li>
        <li>
          <p>Cotizar</p>
          <ul>
            <li><Link to={'/cotizador'}>Cotizar</Link></li>
            <li><Link to={'/cotizadorListaPrecios'}>lista de precios</Link></li>
          </ul>
        </li>
        <li>
          <p>Contactos</p>
          <ul>
            <li><Link to={'/clients'}>Clientes</Link></li>
          </ul>
        </li>
        <li>logout</li>
      </ul>
    </nav>
  )
}
