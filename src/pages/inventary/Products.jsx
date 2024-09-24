import React from 'react'
import '../../styles/index.css'
import { NavBar } from "../../components/NavBar"
import { SideBar } from "../../components/SideBar"
import { FormTable } from '../../components/FormTable'
import { ShowTable } from '../../components/ShowTable'
import config from '../../config.js'
import { FormTContext } from '../../providers/FormTContext.jsx'

const URL_CRUD = `${config.url}/products`

const HEADERS_CATEGORY = ['id', 'name', 'description', 'acctions']

const DATA_FORM = {
  nombre: 'Formulario Items de Cobro',
  campos: [
    { name: 'id', type: 'number', nameQuery: 'id' },
    { name: 'name', type: 'string', nameQuery: 'name' },
    { name: 'description', type: 'textarea', nameQuery: 'description' },
    { name: 'price', type: 'number', nameQuery: 'price' },
    { name: 'measure', type: 'string', nameQuery: 'measure' },
    { name: 'category', type: 'string', nameQuery: 'category', subItem: true, URL_CRUD: `${config.url}/category`, HEADERS: HEADERS_CATEGORY },
    { name: 'category_aux', type: 'string', nameQuery: 'category_aux', noEnable: true }],
}

const HEADERS = ['id', 'name', 'description', 'price', 'measure', 'category_id', 'category', 'acctions']

export const Products = () => {
  return (
    <>
      <NavBar />
      <SideBar />
      <section className='content-home'>
        <h2>Productos</h2>
        <FormTContext>
          <FormTable DATA_FORM={DATA_FORM} URL_CRUD={URL_CRUD} />
          <ShowTable HEADERS={HEADERS} URL_CRUD={URL_CRUD} />
        </FormTContext>
      </section>
    </>
  )
}
