import '../styles/navBar.css'
import { Link } from 'react-router-dom'

export const SideBar = () => {
  return (
    <nav className='navleft'>
      <ul className='ul-navleft'>
        <li>
          <p>lista de items de inventario</p>
          <ul>
            <li><Link>items de cobro</Link></li>
            <li><Link to='/categories'>Categorias</Link></li>
          </ul>
        </li>
        <li>diacs</li>
        <li>logout</li>
      </ul>
    </nav>
  )
}
