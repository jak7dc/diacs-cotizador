import React from 'react'
import { useState } from 'react'
import { NavBar } from '../../components/general/NavBar.jsx'
import { SideBar } from '../../components/general/SideBar.jsx'
import { ShowTable } from '../../components/singleForm/ShowTable.jsx'
import { FormTable } from '../../components/singleForm/FormTable.jsx'
import { FormTContext } from '../../providers/FormTContext.jsx'
import config from '../../config.js'

const URL_CRUD = `${config.url}/priceList`

const DATA_FORM = {
  nombre: 'formulario de Lista de Precios',
  nombreFormulario: 'formListaPrecios',
  campos: [
    { name: 'id', type: 'label', nameQuery: 'id' },
    { name: 'nombre', type: 'string', nameQuery: 'name' },
    { name: 'descripcion', type: 'textarea', nameQuery: 'description' },
    { name: 'unidad de medida', type: 'string', nameQuery: 'measure' },
    { name: 'costo por unidad', type: 'number', nameQuery: 'price' },
    { name: 'utilidad', type: 'number', nameQuery: 'utilitis' },
  ],
}

const HEADERS = ['id', 'nombre', 'descripcion', 'und medida', 'precio und', 'utilidad']

const SUB_FORM = {
  URL_CRUD: `${config.url}/priceList_items`,
  TITLE: 'rangos de precio',
  HEADERS: [
    { name: 'id', type: 'label', nameQuery: 'id' },
    { name: 'hasta', type: 'number', nameQuery: 'limit' },
    { name: 'precio', type: 'number', nameQuery: 'price' },
    { name: 'aproximar en', type: 'number', nameQuery: 'approximate' },
    { name: 'item lista', type: 'label', nameQuery: 'listPriceId', noEnable: true }
  ]
}

export const CotPriceList = () => {
  const [enableForm, setEnableForm] = useState(false);

  return (
    <>
      <NavBar />
      <SideBar />
      <section className='content-home'>
        <h2>Lista de precios</h2>
        <FormTContext>
          {enableForm ?
            <FormTable
              SUB_FORM={SUB_FORM}
              DATA_FORM={DATA_FORM}
              URL_CRUD={URL_CRUD}
              setGetId={() => { }}
              setEnableForm={setEnableForm} /> :
            <></>
          }
          <ShowTable HEADERS={HEADERS} URL_CRUD={URL_CRUD} barSearch={true} visiveForm={{ enableForm, setEnableForm }} />
        </FormTContext>
      </section>
    </>
  )
}
