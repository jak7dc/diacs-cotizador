import '../styles/index.css'
import { NavBar } from "../components/NavBar"
import { SideBar } from "../components/SideBar"

export const Home = () => {
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
