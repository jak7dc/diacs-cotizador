import React from 'react'
import { NavBar } from '../../components/NavBar.jsx'
import { SideBar } from '../../components/SideBar.jsx'
import config from '../../config.js'
import { FormTContext } from '../../providers/FormTContext.jsx'
import { FormTable } from '../../components/FormTable.jsx'
import { ShowTable } from '../../components/ShowTable.jsx'

const URL_CRUD = `${config.url}/priceList`

// const HEADERS_CATEGORY = ['id', 'name', 'description', 'acctions']

const DATA_FORM = {
  nombre: 'Lista de precios',
  campos: [
    { name: 'id', type: 'number', nameQuery: 'id' },
    { name: 'categoria', type: 'string', nameQuery: 'name' },
    { name: 'description', type: 'textarea', nameQuery: 'description' },
    { name: 'unidad de medida', type: 'string', nameQuery: 'measure' },
    { name: 'costo unidad', type: 'number', nameQuery: 'price' },
    { name: 'utilidad', type: 'string', nameQuery: 'utilitis' },
    { name: 'sub-tabla', type: 'table',nameQuery:'table', subForm : true }],
}

const HEADERS = ['id', 'nombre', 'descripcion', 'und medida', 'costo und', 'utilidad', 'acctions']



export const CotPriceList = () => {
  return (
    <>
      <NavBar />
      <SideBar />
      <section className='content-home'>
        <h2>lista de precios</h2>
        <FormTContext>
          <FormTable DATA_FORM={DATA_FORM} URL_CRUD={URL_CRUD} />
          <ShowTable HEADERS={HEADERS} URL_CRUD={URL_CRUD} />
        </FormTContext>
      </section>
    </>
  )
}
