/* eslint-disable react/prop-types */
import React from 'react'
import '../../styles/general/formCompuesto.css'
import { useState, useEffect } from 'react'
import { searchTable, insertTable, deleteTable } from '../../api/general.crud'
import { useUserContext } from '../../providers/UserContext'
import { useFormTContext } from '../../providers/FormTContext'

const FormTableCompuesto = (props) => {
  const { SUB_FORM } = props
  const [userAcctions] = useUserContext()
  const [formActions] = useFormTContext()
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (formActions.form.values) {
      showRows(formActions.form.values[0])
    }
  }, []);

  const showRows = async (id) => {
    const request = await searchTable(`${SUB_FORM.URL_CRUD}Search`, id, userAcctions.user.token)
    setRows(...[request.data])
  }

  const addRow = async (e) => {
    e.preventDefault()
    const formData = new FormData(document.getElementById(SUB_FORM.TITLE))
    const dataForm = Object.fromEntries(formData.entries())
    const row = dataForm
    row.listPriceId = formActions.form.values[0]
    const data = await insertTable(SUB_FORM.URL_CRUD, row, userAcctions.user.token)
    if (data.response.status < 299) {
      clearForm(SUB_FORM.TITLE)
      showRows(formActions.form.values[0])
    }
  }

  const clearForm = (name) => {
    SUB_FORM.HEADERS.forEach((element) => {
      let input = document.getElementById(`${name}_${element.nameQuery}`)
      input.value = ''
    });
  }

  const deleteRow = async (id) => {
    const request = await deleteTable(SUB_FORM.URL_CRUD, id, userAcctions.user.token)
    if (request.response.status < 299) {
      showRows(formActions.form.values[0])
    }
  }
  return (
    <div className='frCompuesto-max-content'>
      <h2 className='frTable-h2'>{SUB_FORM.TITLE}</h2>
      <div>
        <form className='frCompuesto' id={`${SUB_FORM.TITLE}`}>
          <div className='frCompuesto-form-content'>
            {SUB_FORM.HEADERS.map((item, x) => {
              return (
                <Campo key={x} item={item} nameId={SUB_FORM.TITLE} />
              )
            })}
          </div>
          <div>
            <button className='frTable-btn-acction' onClick={addRow}>Nuevo</button>
          </div>
        </form>
        <table className='swTable-table'>
          <thead>
            <tr>
              {SUB_FORM.HEADERS.map((item, x) => {
                return <th key={x}>{item.name}</th>
              })}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item, x) => {
              return (
                <tr key={x}>
                  {Object.values(item).map((sub_item, x) => {
                    return (
                      <td key={x}>{sub_item}</td>
                    )
                  })}
                  <td>
                    <button className='frTable-btn-close' onClick={() => { deleteRow(Object.values(item)[0]) }}>Eliminar</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const Campo = (props) => {
  const { item, nameId } = props
  const { name, type, nameQuery, noEnable } = item
  if (!noEnable) {
    if (type != 'label') {
      return (
        <div className='frCompuesto-sub-content'>
          <label>{`${name}:`}</label>
          <input id={`${nameId}_${nameQuery}`} name={nameQuery} placeholder={name} type={type} />
        </div>
      )
    } else {
      return (
        <div className='frCompuesto-sub-content'>
          <label>{`${name}:`}</label>
          <input id={`${nameId}_${nameQuery}`} name={nameQuery} placeholder={name} type={type} readOnly={true} />
        </div>
      )
    }
  } else {
    return (
      <label className='frCompuesto-sub-content' id={`${nameId}_${nameQuery}`} name={nameQuery}></label>
    )
  }
}

export default FormTableCompuesto
