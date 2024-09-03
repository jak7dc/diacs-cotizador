import '../styles/navBar.css'
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
        <li>diacs</li>
        <li>logout</li>
      </ul>
    </nav>
  )
}
