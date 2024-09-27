import '../../styles/cotizacion/cotizacion.css'
import React from 'react'
import { useState, useEffect } from 'react'
import { NavBar } from '../../components/general/NavBar.jsx'
import { SideBar } from '../../components/general/SideBar.jsx'
import { FormTable } from '../../components/singleForm/FormTable.jsx'
import { ShowTable } from '../../components/singleForm/ShowTable.jsx'
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
    { name: 'utilidad', type: 'number', nameQuery: 'utilitis'},
  ],
}

const HEADERS = ['id', 'nombre', 'descripcion', 'und medida', 'precio und', 'utilidad', 'acciones']

const URL_CRUD_SUB = `${config.url}/priceList_items`

const DATA_FORM_SUB = {
  nombre: 'Escala de precios',
  nombreFormulario: 'formEscalaPrecios',
  campos: [
    { name: 'id', type: 'label', nameQuery: 'id' },
    { name: 'hasta', type: 'string', nameQuery: 'limit' },
    { name: 'precio', type: 'number', nameQuery: 'price' },
    { name: 'aproximar en', type: 'number', nameQuery: 'approximate' },
    { name: 'item de lista', type: 'label', nameQuery: 'listPriceId' },
  ],
}
// limit, price, approximate, listPriceId
const HEADERS_SUB = ['id', 'hasta','precio' ,'aproximar en', 'item de lista',]

export const CotPriceList = () => {
  const [getId, setGetId] = useState(0);
  const [getIdSub, setGetIdSub] = useState(0);

  useEffect(() => {
    const input = document.getElementById('formEscalaPrecios_listPriceId')
    if(getId == 0){
      input.value = ''
    }else{
      input.value = getId
    }
  }, [getId]);

  return (
    <>
      <NavBar />
      <SideBar />
      <section className='content-home'>
        <h2>Lista de precios</h2>
        <FormTContext>
          <FormTable DATA_FORM={DATA_FORM} URL_CRUD={URL_CRUD} setGetId= {setGetId} />
          <ShowTable HEADERS={HEADERS} URL_CRUD={URL_CRUD} />
        </FormTContext>
        <FormTContext>
          <FormTable DATA_FORM={DATA_FORM_SUB} URL_CRUD={URL_CRUD_SUB} getId={getIdSub} setGetId={setGetIdSub} />
          <ShowTable HEADERS={HEADERS_SUB} URL_CRUD={URL_CRUD_SUB} search={getId}/>
        </FormTContext>
      </section>
    </>
  )
}
