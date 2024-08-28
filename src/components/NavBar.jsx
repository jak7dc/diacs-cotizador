import '../styles/navBar.css'
import { useUserContext } from '../providers/UserContext'
import { useNavigate } from 'react-router-dom'

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
        <li>imagen</li>
        <li>diacs</li>
        <li><button onClick={logout}>logout</button></li>
      </ul>
    </nav>
  )
}