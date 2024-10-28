import React from 'react'
import { NavBar } from '../../components/general/NavBar.jsx'
import { SideBar } from '../../components/general/SideBar.jsx'
import { FormTContext } from '../../providers/FormTContext.jsx'
import { ShowTable } from '../../components/singleForm/ShowTable.jsx'
import { useState } from 'react'
import config from '../../config.js'
import CotizacionForm from '../../components/cotizacion/CotizacionForm.jsx'

const URL_CRUD = `${config.url}/cotizacion`

const HEADERS_CLIENTES = ['id', 'nombre', 'tipo id', 'numero id', 'direccion', 'correo', 'telefono', 'servicio', 'contacto']

const DATA_FORM = {
  nombre: 'formulario de cotizacion',
  nombreFormulario: 'form-cotizacion',
  campos: [
    { name: 'id', type: 'label', nameQuery: 'id' },
    { name: 'nombre', type: 'string', nameQuery: 'name' },
    {
      name: 'cliente', type: 'string', nameQuery: 'clientId', subItem: true, URL_CRUD: `${config.url}/clients`, HEADERS: HEADERS_CLIENTES,
      nameForm: 'Lista de Clientes'
    },
    { name: 'cantidad', type: 'number', nameQuery: 'quantity' },
    { name: 'cliente_aux', type: 'string', nameQuery: 'clientId_aux', noEnable: true },
    { name: 'costo trabajo', type: 'number', nameQuery: 'price', noEnable: true },
    { name: 'costo cotizacion', type: 'number', nameQuery: 'cost', noEnable: true },
    { name: 'costo total', type: 'number', nameQuery: 'total', noEnable: true },
  ],
}

const HEADERS = ['id', 'nombre', 'cantidad', 'id cliente', 'cliente', 'costo trabajo', 'costo cotizacion', 'total']

const SUB_FORM = {
  URL_CRUD: `${config.url}/cotizacion_items`,
  TITLE: 'Cotizar Items',
  CAMPOS: [
    { name: 'id', type: 'label', nameQuery: 'id' },
    { name: 'tipo', type: 'string', nameQuery: 'name' },
    { name: 'item', type: 'string', nameQuery: 'item' },
    { name: 'cantidad', type: 'number', nameQuery: 'quantity' },
    { name: 'costo und', type: 'number', nameQuery: 'price' },
    { name: 'und medida', type: 'combox', nameQuery: 'measure', cboItems: ['unidad finalizada', 'tamaño', 'pliego', 'metro ^2'] },
    { name: 'utilidad', type: 'number', nameQuery: 'utilitis' },
    { name: 'total', type: 'number', nameQuery: 'total' },
    { name: 'lista de precios', type: 'label', nameQuery: 'priceList' },
    // { name: 'cotizacion_id', type: 'number', nameQuery: 'cotizacionId' },
  ],
  HEADERS: ['id', 'nombre', 'item', 'cantidad', 'costo/unid', 'und/medida', 'utilidad', 'total', 'lista/precios']
}

export const CotHome = () => {
  const [enableForm, setEnableForm] = useState(false);
  return (
    <>
      <NavBar />
      <SideBar />
      <section className='content-home'>
        <h2>Cotizaciones</h2>
        <FormTContext>
          {enableForm ?
            <CotizacionForm
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
