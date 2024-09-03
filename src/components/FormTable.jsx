/* eslint-disable react/prop-types */
import { useFormTContext } from '../providers/FormTContext';
import { useUserContext } from '../providers/UserContext';
import { useState, useEffect } from 'react'

export const FormTable = (props) => {
  const [userAcctions] = useUserContext()
  const { DATA_FORM, URL_CRUD } = props
  const [query, setQuery] = useState("");
  const [formActions] = useFormTContext()
  const [state, setState] = useState('Nuevo');

  useEffect(() => {
    editTable()
  }, [formActions.form]);

  const editTable = () => {
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

  const actionForm = (e) => {
    e.preventDefault()
    const formData = new FormData(document.getElementById('form-data'))
    const dataForm = Object.fromEntries(formData.entries())
    insertTable(dataForm)
  }

  const insertTable = async (dataForm) => {
    if (state === 'Nuevo') {
      const response = await fetch(URL_CRUD, {
        method: 'POST',
        body: JSON.stringify(dataForm),
        headers: {
          'Content-type': 'Application/json',
          'Authorization': `Bearer ${userAcctions.user.token}`
        }
      })

      const data = await response.json()

      setQuery(data.message)

      if (response.status < 299) {
        formActions.setForm({
          values: '',
          rows: formActions.form.rows
        })
      }
    } else {
      const response = await fetch(URL_CRUD, {
        method: 'PUT',
        body: JSON.stringify(dataForm),
        headers: {
          'Content-type': 'Application/json',
          'Authorization': `Bearer ${userAcctions.user.token}`
        }
      })

      const data = await response.json()

      setQuery(data.message)
      if (response.status < 299) {
        formActions.setForm({
          values: '',
          rows: formActions.form.rows
        })
      }
    }
  }

  const cerrar = (e) => {
    e.preventDefault()
    formActions.clearForm()
  }

  return (
    <div>
      <h2>{DATA_FORM.nombre}</h2>
      <form id='form-data'>
        <div className='content-form'>
          {DATA_FORM.campos.map((items, x) => {
            return (
              <div key={x}>
                <Campos items={items} index={x} />
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
      {/* <label>{JSON.stringify(formActions.form)}</label> */}
    </div>
  )
}

export const Campos = (props) => {
  const { items } = props
  const { name, type, subItem, nameQuery } = items
  if (subItem == true) {
    return (
      <div className='item-compuesto'>
        <input id={nameQuery} className='item-compuesto-id' name={nameQuery} type='number' placeholder='0' />
        <input id={`${nameQuery}_aux`} className='item-compuesto-txt' name={`${nameQuery}_aux`} placeholder={name} type={type} />
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
}