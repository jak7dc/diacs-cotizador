import React from 'react'
import { NavBar } from "../../components/general/NavBar"
import { SideBar } from "../../components/general/SideBar"
import { FormTable } from '../../components/singleForm/FormTable'
import { ShowTable } from '../../components/singleForm/ShowTable'
import config from '../../config.js'
import { FormTContext } from '../../providers/FormTContext.jsx'
import { useState } from 'react'
const URL_CRUD = `${config.url}/products`

const HEADERS_CATEGORY = ['id', 'name', 'description', 'acctions']

const DATA_FORM = {
  nombre: 'Formulario Items de Cobro',
  nombreFormulario: 'categoria',
  campos: [
    { name: 'id', type: 'number', nameQuery: 'id' },
    { name: 'name', type: 'string', nameQuery: 'name' },
    { name: 'description', type: 'textarea', nameQuery: 'description' },
    { name: 'price', type: 'number', nameQuery: 'price' },
    { name: 'measure', type: 'string', nameQuery: 'measure' },
    {
      name: 'category', type: 'string', nameQuery: 'category', subItem: true,
      URL_CRUD: `${config.url}/category`, HEADERS: HEADERS_CATEGORY, nameForm: 'Lista de Categorias'
    },
    { name: 'category_aux', type: 'string', nameQuery: 'category_aux', noEnable: true }],
}

const HEADERS = ['id', 'name', 'description', 'price', 'measure', 'category_id', 'category']

export const Products = () => {
  const [enableForm, setEnableForm] = useState(false);
  return (
    <>
      <NavBar />
      <SideBar />
      <section className='content-home'>
        <h2>Productos</h2>
        <FormTContext>
          {enableForm ?
            <FormTable DATA_FORM={DATA_FORM} URL_CRUD={URL_CRUD} setGetId={() => { }} setEnableForm={setEnableForm} /> :
            <></>
          }
          <ShowTable HEADERS={HEADERS} URL_CRUD={URL_CRUD} barSearch={true} visiveForm={{ enableForm, setEnableForm }} />
        </FormTContext>
      </section>
    </>
  )
}
