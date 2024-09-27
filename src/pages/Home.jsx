import React from 'react'
import '../styles/index.css'
import { NavBar } from "../components/general/NavBar"
import { SideBar } from "../components/general/SideBar"

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
