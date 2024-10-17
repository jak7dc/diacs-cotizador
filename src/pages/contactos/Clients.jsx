import React from 'react'
import '../../styles/contactos.css'
import { NavBar } from '../../components/general/NavBar'
import { SideBar } from '../../components/general/SideBar'
import { FormTContext } from '../../providers/FormTContext'
import { FormTable } from '../../components/singleForm/FormTable'
import { ShowTable } from '../../components/singleForm/ShowTable'
import config from '../../config'
import { useState } from 'react'


const URL_CRUD = `${config.url}/clients`

const DATA_FORM = {
  nombre: 'formulario de clientes',
  nombreFormulario: 'formclients',
  campos: [
    { name: 'id', type: 'label', nameQuery: 'id' },
    { name: 'nombre', type: 'string', nameQuery: 'name' },
    { name: 'tipo id', type: 'string', nameQuery: 'typeDoc' },
    { name: 'numero id', type: 'string', nameQuery: 'doc' },
    { name: 'direccion', type: 'string', nameQuery: 'addres' },
    { name: 'correo', type: 'string', nameQuery: 'mail' },
    { name: 'telefono', type: 'string', nameQuery: 'phone' },
    { name: 'servicio', type: 'string', nameQuery: 'service' },
    { name: 'contacto', type: 'string', nameQuery: 'contact' },
  ],
}

const HEADERS = ['id', 'nombre', 'tipo id', 'numero id', 'direccion', 'correo', 'telefono', 'servicio', 'contacto']



const Clients = () => {
  const [enableForm, setEnableForm] = useState(false);

  return (
    <>
      <NavBar />
      <SideBar />
      <section className='content-home'>
        <h2 className='home-h2'>Clientes</h2>
        <FormTContext>
          {enableForm ?
            <FormTable
              DATA_FORM={DATA_FORM}
              URL_CRUD={URL_CRUD}
              setGetId={() => { }}
              setEnableForm={setEnableForm} />
            : <></>}
          <ShowTable
            HEADERS={HEADERS}
            URL_CRUD={URL_CRUD}
            barSearch={true}
            visiveForm={{ enableForm, setEnableForm }} />
        </FormTContext>
      </section>
    </>
  )
}

export default Clients
