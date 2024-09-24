/* eslint-disable react/prop-types */
import React from 'react';
import { useFormTContext } from '../providers/FormTContext';
import { useUserContext } from '../providers/UserContext';
import { useState, useEffect } from 'react'
import { ModalForm } from './ModalForm';
import { insertTable, editeTable } from '../api/inventario';
import { SubFormTable } from './SubFormTable';

export const FormTable = (props) => {
  const [userAcctions] = useUserContext()
  const { DATA_FORM, URL_CRUD } = props
  const [query, setQuery] = useState("");
  const [formActions] = useFormTContext()
  const [state, setState] = useState('Nuevo');
  const [modalStatus, setModalStatus] = useState({ estado: 'oculto', item: {} });
  const [subForm, setSubForm] = useState({estado: 'oculto',item : {}});

  useEffect(() => {
    editeForm()
  }, [formActions.form]);

  // RELLENA LOS DATOS DEL FORMULARIO SEGUN SEAN SELECCIONADO SEN EL COMPONENTE SHOWTABLE

  const editeForm = () => {
    if (formActions.form.values) {
      formActions.form.values.forEach((element, index) => {
        let input = document.getElementById(DATA_FORM.campos[index].nameQuery)
        input.value = element
      });
      setState('Editar')
    } else {
      DATA_FORM.campos.forEach((element) => {
        let input = document.getElementById(element.nameQuery)
        input.value = ''
      });
      setState('Nuevo')
    }
  }

  // EXTRAE LOS CAMPOS DEL FORMULARIO

  const actionForm = (e) => {
    e.preventDefault()
    const formData = new FormData(document.getElementById('form-data'))
    const dataForm = Object.fromEntries(formData.entries())
    actionTable(dataForm)
  }

  // INSERTA O EDITA LOS ITEMS DE LA TABLA DESDE EL RCHIVO INVENTARIO CARPETA API 
  const actionTable = async (dataForm) => {
    const request = state === 'Nuevo' ?
      (await insertTable(URL_CRUD, dataForm, userAcctions.user.token)) :
      (await editeTable(URL_CRUD, dataForm, userAcctions.user.token))

    setQuery(request.data.message)
    if (request.response.status < 299) {
      formActions.setForm({
        values: '',
        rows: formActions.form.rows
      })
    }
  }

  // LIMPIA EL FORMULARIO
  const cerrar = (e) => {
    e.preventDefault()
    formActions.clearForm()
  }

  // ENCARGADO DEL RENDER DE LA VENTANA MODAL
  const modal = (item) => {
    setModalStatus({ estado: 'visible', item })
  }

  // ENCARGADO DEL RENDER DE LAS SUBTABLAS
  const subFormAcction = () =>{
    setSubForm({estado : 'visible'})
  }

  return (
    <div>
      <h2>{DATA_FORM.nombre}</h2>
      <form id='form-data'>
        <div className='content-form'>
          {DATA_FORM.campos.map((items, x) => {
            return (
              <div key={x}>
                <Campos items={items} index={x} modal={modal} subFormAcction ={subFormAcction} />
              </div>
            )
          })}
        </div>
        <button onClick={actionForm}>{state}</button>
        {
          state == 'Editar' ?
            (<button onClick={cerrar} >Cerrar</button>) : (<></>)
        }
      </form>
      <label>{query}</label>
      {
        modalStatus.estado != 'oculto' ?
          (<ModalForm setModalStatus={setModalStatus} modalStatus={modalStatus} />) : (<></>)
      }
      {
        subForm.estado != 'oculto' ?
        (<SubFormTable/>) : (<></>)
      }
    </div>
  )
}


// ESTILISA Y DISCRIMINA LOS CAMPOS SEGUN EL DEBER DE SU ESTADO 

export const Campos = (props) => {
  const { items, modal,subFormAcction } = props
  const { name, type, subItem, nameQuery, noEnable , subForm} = items
  
  // DETERMINA SI EL VALOR CONTIENE UN SUB FORMULARIO
  if(subForm != true){

    // DETERMINA SI EL ITEM A RENDERIZAR ES O NO VISIBLE
    if (noEnable != true) {
      // DETERMINA SI EL ITEM A RENDERIZAR TIENE PROVIENE DE OTRA TABLA 
      if (subItem == true) {
        return (
          <div className='item-compuesto'>
            <input id={nameQuery} className='item-compuesto-id' name={nameQuery} type='number' placeholder='0' />
            <input id={`${nameQuery}_aux`} className='item-compuesto-txt' name={`${nameQuery}_aux`} placeholder={name} type={type} />
            <button onClick={(e) => {
              e.preventDefault()
              modal(items)
            }}>.:.</button>
          </div>
        )
      }
      if (subItem != true) {
  
        if (type != 'textarea') return (
          <input id={nameQuery} type={type} name={nameQuery} placeholder={name} />
        )
  
        return (
          <textarea id={nameQuery} name={nameQuery} placeholder={name} />
        )
      }
    } else {
      return <label id={nameQuery}></label>
    }
  } else {
    return (
      <>
        <label id={nameQuery}></label>
        <button id='btn-verSubForm' onClick={(e)=>{
          e.preventDefault()
          subFormAcction()
        }}>ver sub tabla</button>
      </>
    )
  }
  
}


