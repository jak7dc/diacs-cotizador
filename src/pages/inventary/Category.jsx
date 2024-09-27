import React from 'react'
import '../../styles/index.css'
import { NavBar } from "../../components/general/NavBar"
import { SideBar } from "../../components/general/SideBar"
import { FormTable } from '../../components/singleForm/FormTable'
import { ShowTable } from '../../components/singleForm/ShowTable'
import config from '../../config.js'
import { FormTContext } from '../../providers/FormTContext.jsx'

const DATA_FORM = {
  nombre: 'Formulario de categorias',
  nombreFormulario: 'categoria',
  campos: [
    { name: 'id', type: 'number', nameQuery: 'id' },
    { name: 'nombre', type: 'string', nameQuery: 'name' },
    { name: 'descripcion', type: 'textarea', nameQuery: 'description' }],
}

const URL_CRUD = `${config.url}/category`

const HEADERS = ['id', 'nombre', 'descripcion', 'acciones']


export const Category = () => {

  return (
    <>
      <NavBar />
      <SideBar />
      <section className='content-home'>
        <h2>categoria</h2>
        <FormTContext>
          <FormTable DATA_FORM={DATA_FORM} URL_CRUD={URL_CRUD} setGetId={()=>{}}/>
          <ShowTable HEADERS={HEADERS} URL_CRUD={URL_CRUD} />
        </FormTContext>
      </section>
    </>
  )
}
