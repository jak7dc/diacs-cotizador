import '../styles/index.css'
import { NavBar } from "../components/NavBar"
import { SideBar } from "../components/SideBar"
import { useUserContext } from '../providers/UserContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const [userActions] = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userActions.user.token) navigate('/')

  }, []);

  return (
    <>
      <NavBar />
      <SideBar />
      <section className='content-home'>
        <h2>dashboard</h2>
      </section>
    </>
  )
}
