import React from 'react'
import '../../styles/general/navBar.css'
import { useUserContext } from '../../providers/UserContext'
import { useNavigate } from 'react-router-dom'
import logo from '../../../public/lgtDiacs.png'

export const NavBar = () => {
  const [userActions] = useUserContext()
  const navigate = useNavigate()

  const logout = () => {
    userActions.userClear()
    navigate('/')
  }

  return (
    <nav className='navUp'>
      <ul className='ul-navUp'>
        <li className='linavbar'><img src={logo} alt='diacs' /></li>
        <li className='linavbar'><h2>Diacs</h2></li>
        <li className='linavbar'><button onClick={logout}>Cerrar Sesion</button></li>
      </ul>
    </nav>
  )

}