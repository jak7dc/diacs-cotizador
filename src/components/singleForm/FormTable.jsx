/* eslint-disable react/prop-types */
import React from 'react';
import '../../styles/general/formTable.css'
import { useFormTContext } from '../../providers/FormTContext';
import { useUserContext } from '../../providers/UserContext';
import { useState, useEffect } from 'react'
import { ModalForm } from './ModalForm';
import { insertTable, editeTable, searchTable } from '../../api/general.crud';
import FormTableCompuesto from './FormTableCompuesto';

export const FormTable = (props) => {
  const [userAcctions] = useUserContext()
  const { DATA_FORM, URL_CRUD, setGetId, setEnableForm, SUB_FORM } = props
  const [query, setQuery] = useState("");
  const [formActions] = useFormTContext()
  const [state, setState] = useState('Nuevo');
  const [modalStatus, setModalStatus] = useState({ estado: 'oculto', item: {} });
  // const [subForm, setSubForm] = useState({ estado: 'oculto', item: {} });

  useEffect(() => {
    // console.log(SUB_FORM)
    editeForm()
  }, [formActions.form]);

  // RELLENA LOS DATOS DEL FORMULARIO SEGUN SEAN SELECCIONADO SEN EL COMPONENTE SHOWTABLE
  const editeForm = () => {
    if (formActions.form.values) {
      formActions.form.values.forEach((element, index) => {
        let input = document.getElementById(`${DATA_FORM.nombreFormulario}_${DATA_FORM.campos[index].nameQuery}`)
        input.value = element
      });
      setState('Editar')
      setGetId(document.getElementById(`${DATA_FORM.nombreFormulario}_id`).value)
    } else {
      DATA_FORM.campos.forEach((element) => {
        let input = document.getElementById(`${DATA_FORM.nombreFormulario}_${element.nameQuery}`)
        input.value = ''
      });
      setState('Nuevo')
      setGetId(0)
    }
  }

  // EXTRAE LOS CAMPOS DEL FORMULARIO

  const actionForm = (e) => {
    e.preventDefault()
    const formData = new FormData(document.getElementById(DATA_FORM.nombreFormulario))
    const dataForm = Object.fromEntries(formData.entries())
    actionTable(dataForm)

  }

  // INSERTA O EDITA LOS ITEMS DE LA TABLA DESDE EL RCHIVO INVENTARIO CARPETA API 

  // DISCRIMINA SI TIENE UNA SUB TABLA PARA DEMARCAR LOS ITEMS EN LOS CAMPOS Y SER EDITADOS  
  // SUB_FORM ES EL ITEM QUE UTILIZAMOS PARA SABER SI TENEMOS O NO UN SUB FORMULARIO 
  const actionTable = async (dataForm) => {
    const request = state === 'Nuevo' ?
      (await insertTable(URL_CRUD, dataForm, userAcctions.user.token)) :
      (await editeTable(URL_CRUD, dataForm, userAcctions.user.token))

    setQuery(request.data.message)
    if (SUB_FORM) {
      if (request.response.status < 299) {
        const rowId = request.data.data.lastInsertRowid
        const row = await searchTable(`${URL_CRUD}Search`, rowId, userAcctions.user.token)

        console.log(Object.values(row.data[0]))
        formActions.setForm({
          values: Object.values(row.data[0]),
          rows: formActions.form.rows
        })
      }
    } else {
      if (request.response.status < 299) {
        formActions.setForm({
          values: '',
          rows: formActions.form.rows
        })
      }
      setEnableForm(0)
    }
  }

  // LIMPIA EL FORMULARIO
  const cerrar = (e) => {
    e.preventDefault()
    formActions.clearForm()
    setEnableForm(0)
  }

  // ENCARGADO DEL RENDER DE LA VENTANA MODAL
  const modal = (item) => {
    setModalStatus({ estado: 'visible', item })
  }

  // ENCARGADO DEL RENDER DE LAS SUBTABLAS


  return (
    <div className='frTable-max'>
      <div className='frTable-content'>
        <div className='frTable-form-max'>
          <form id={DATA_FORM.nombreFormulario}>
            <h2 className='frTable-h2'>{DATA_FORM.nombre}</h2>
            <div className='frTable-form'>
              {DATA_FORM.campos.map((items, x) => {
                return (
                  <Campos key={x} items={items} index={x} modal={modal} nameId={DATA_FORM.nombreFormulario} />
                )
              })}
            </div>
            <div>
              <button className='frTable-btn-acction' onClick={actionForm}>{state}</button>
              <button className='frTable-btn-close' onClick={cerrar} >Cerrar</button>
            </div>
          </form>
          {SUB_FORM && state != 'Nuevo' ?
            <FormTableCompuesto
              SUB_FORM={SUB_FORM} /> :
            <></>}
        </div>
        <label>{query}</label>
        {
          modalStatus.estado != 'oculto' ?
            (<ModalForm
              setModalStatus={setModalStatus}
              modalStatus={modalStatus}
              nameId={DATA_FORM.nombreFormulario} />) : (<></>)
        }
      </div>
    </div>
  )
}


// ESTILISA Y DISCRIMINA LOS CAMPOS SEGUN EL DEBER DE SU ESTADO 

export const Campos = (props) => {
  const { items, modal, nameId } = props
  const { name, type, subItem, nameQuery, noEnable } = items

  // DETERMINA SI EL ITEM A RENDERIZAR ES O NO VISIBLE
  if (noEnable != true) {
    // DETERMINA SI EL ITEM A RENDERIZAR TIENE PROVIENE DE OTRA TABLA 
    if (subItem == true) {
      return (
        <div>
          <div className='frTable-item-compuesto'>
            <label>{`${name}:`}</label>
            <div className='frTable-sub-item'>
              <input id={`${nameId}_${nameQuery}`} className='frTable-item-compuesto-id' name={nameQuery} type='number' placeholder='0' />
              <input id={`${nameId}_${nameQuery}_aux`} className='frTable-item-compuesto-txt' name={`${nameQuery}_aux`} placeholder={name} type={type} />
              <button className='frTable-btn-modal' onClick={(e) => {
                e.preventDefault()
                modal(items)
              }}>.:.</button>
            </div>
          </div>
        </div>
      )
    }
    if (subItem != true) {

      if (type != 'textarea' && type != 'label') return (
        <div>
          <div className='frTable-item-compuesto'>
            <label>{`${name}:`}</label>
            <input id={`${nameId}_${nameQuery}`} type={type} name={nameQuery} placeholder={name} />
          </div>
        </div>
      )
      if (type == 'label') return (
        <div>
          <div className='frTable-item-compuesto'>
            <label>{`${name}:`}</label>
            <input name={nameQuery} id={`${nameId}_${nameQuery}`} placeholder={name} readOnly={true} />
          </div>
        </div>
      )

      return (
        <div>
          <div className='frTable-item-compuesto'>
            <label>{`${name}:`}</label>
            <textarea id={`${nameId}_${nameQuery}`} name={nameQuery} placeholder={name} />
          </div>
        </div>
      )
    }
  } else {
    return (
      <div className='frTable-noEnable'>
        <label id={`${nameId}_${nameQuery}`}></label>
      </div>
    )
  }
}