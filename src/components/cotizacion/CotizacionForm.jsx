/* eslint-disable react/prop-types */

import React from 'react'
import '../../styles/cotizacion/cotizacion.css'
import { useUserContext } from '../../providers/UserContext'
import { useFormTContext } from '../../providers/FormTContext'
import { useState, useEffect } from 'react';
import { ModalForm } from '../singleForm/ModalForm';
import { insertTable, editeTable, searchTable, deleteTable } from '../../api/general.crud';
import config from '../../config';


const CotizacionForm = (props) => {
  const [userAcctions] = useUserContext()
  const { DATA_FORM, URL_CRUD, setGetId, setEnableForm, SUB_FORM } = props
  const [query, setQuery] = useState("");
  const [formActions] = useFormTContext()
  const [state, setState] = useState('Nuevo');
  const [modalStatus, setModalStatus] = useState({ estado: 'oculto', item: {} });
  const [subTable, setSubTable] = useState([]);
  const [formitems, setFormitems] = useState([]);

  const stSubTable = {
    subTable,
    setSubTable
  }
  const stFormitems = {
    formitems,
    setFormitems
  }

  useEffect(() => {
    editeForm()
  }, [formActions.form]);

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
    if (state === 'Nuevo') {
      dataForm.price = '0'
      dataForm.cost = '0'
      dataForm.total = '0'
    } else {
      const response = await searchTable(`${URL_CRUD}Search`, parseInt(dataForm.id, 10), userAcctions.user.token)
      const price = response.data[0].cotizacion_price
      const cost = response.data[0].cotizacion_cost
      const total = response.data[0].cotizacion_total
      dataForm.price = price.toString()
      dataForm.cost = cost.toString()
      dataForm.total = total.toString()
    }
    const request = state === 'Nuevo' ?
      (await insertTable(URL_CRUD, dataForm, userAcctions.user.token)) :
      (await editeTable(URL_CRUD, dataForm, userAcctions.user.token))

    // console.log(request)

    setQuery(request.data.message)
    if (SUB_FORM) {
      if (request.response.status < 299) {
        if (state === 'Nuevo') {
          const rowId = request.data.data.lastInsertRowid
          const row = await searchTable(`${URL_CRUD}Search`, rowId, userAcctions.user.token)

          formActions.setForm({
            values: Object.values(row.data[0]),
            rows: formActions.form.rows
          })
        }
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

  return (
    <div className='cot-content-max'>
      <div className='cot-content'>
        <div className='cot-form-max'>
          <form id={DATA_FORM.nombreFormulario}>
            <div className='cot-content-h2'>
              <h2 className='cot-h2'>{DATA_FORM.nombre}</h2>
              <button className='frTable-btn-close' onClick={cerrar}>Cerrar</button>
            </div>
            <div className='cot-form'>
              {DATA_FORM.campos.map((items, x) => {
                return (
                  <Campos key={x} items={items} index={x} modal={modal} nameId={DATA_FORM.nombreFormulario} />
                )
              })}
            </div>
            <div>
              <button className='frTable-btn-acction' onClick={actionForm}>{state}</button>
              <button className='frTable-btn-close' onClick={cerrar}>Cerrar</button>
            </div>
          </form>
          {state != 'Nuevo' ?
            (
              <div className='cot-subform-content'>
                <SubForm
                  SUB_FORM={SUB_FORM}
                  modal={modal}
                  TOKEN={userAcctions.user.token}
                  stFormitems={stFormitems}
                  stSubTable={stSubTable}
                />
                <div className='cot-table-content'>
                  <Tabla
                    SUB_FORM={SUB_FORM}
                    TOKEN={userAcctions.user.token}
                    stFormitems={stFormitems}
                    stSubTable={stSubTable}
                  />
                  <TotalCost
                    formActions={formActions}
                    URL_CRUD={URL_CRUD}
                    DATA_FORM={DATA_FORM}
                    TOKEN={userAcctions.user.token}
                    setQuery={setQuery}
                    SUB_FORM={SUB_FORM}
                  />
                </div>
              </div>
            ) : (<></>)
          }

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

const Campos = (props) => {
  const { items, modal, nameId } = props
  const { name, type, subItem, nameQuery, noEnable, cboItems } = items

  // DETERMINA SI EL ITEM A RENDERIZAR ES O NO VISIBLE
  if (noEnable != true) {
    // DETERMINA SI EL ITEM A RENDERIZAR TIENE PROVIENE DE OTRA TABLA 
    if (subItem == true) {
      return (
        <div>
          <div className='frTable-item-compuesto'>
            <label>{`${name}:`}</label>
            <div className='frTable-sub-item'>
              <input id={`${nameId}_${nameQuery}`} className='frTable-item-compuesto-id'
                name={nameQuery} type='number' min={0} placeholder='0' readOnly={true} />
              <input id={`${nameId}_${nameQuery}_aux`} className='frTable-item-compuesto-txt' name={`${nameQuery}_aux`} placeholder={name} type={type} readOnly={true} />
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

      if (type != 'textarea' && type != 'label' && type != 'combox') return (
        <div>
          <div className='frTable-item-compuesto'>
            <label>{`${name}:`}</label>
            <input id={`${nameId}_${nameQuery}`} type={type} name={nameQuery} placeholder={name} min={0} />
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
      if (type == 'combox') return (
        <div>
          <div className='frTable-item-compuesto'>
            <label>{`${name}:`}</label>
            <select id={`${nameId}_${nameQuery}`} name={nameQuery}>
              {cboItems.map((element, index) => {
                return (
                  <option key={index}>
                    {element}
                  </option>
                )
              })}
            </select>
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

const SubForm = (props) => {
  const { SUB_FORM, modal, TOKEN, stSubTable, stFormitems } = props
  const [state, setState] = useState('Agregar');
  const [verModal, setVerModal] = useState({ estado: 'oculto', item: {} });
  // console.log(SUB_FORM)
  useEffect(() => {
    editeForm()
  }, [stFormitems.formitems, verModal]);

  // RELLENA LOS DATOS DEL FORMULARIO SEGUN SEAN SELECCIONADO SEN EL COMPONENTE SHOWTABLE
  const editeForm = () => {
    if (stFormitems.formitems.length && stFormitems.formitems[0]) {
      stFormitems.formitems.forEach((element, index) => {
        let input = document.getElementById(`${SUB_FORM.TITLE}_${SUB_FORM.CAMPOS[index].nameQuery}`)
        input.value = element
      });
      if (stFormitems.formitems[0] === 'nan') {
        setState('Agregar')
        stFormitems.formitems[0] = ''
        let input = document.getElementById(`${SUB_FORM.TITLE}_${SUB_FORM.CAMPOS[0].nameQuery}`)
        input.value = ''
      } else {
        setState("Editar")
      }
    } else {
      SUB_FORM.CAMPOS.forEach((element) => {
        let input = document.getElementById(`${SUB_FORM.TITLE}_${element.nameQuery}`)
        input.value = ''
      });
      setState('Agregar')
    }
  }

  const cerrar = (e) => {
    e.preventDefault()
    stFormitems.setFormitems([])
  }

  // EXTRAE VALORES DEL FORMULARIO DE ATENCION
  const acctionButton = (e) => {
    e.preventDefault()
    const formData = new FormData(document.getElementById('subForm-cot'))
    const dataForm = Object.fromEntries(formData.entries())
    acctionForm(dataForm)
  }

  // INSERTA Y EDITA VALORES DEL FORMULARIO

  const acctionForm = async (data) => {
    const idSearch = document.getElementById('form-cotizacion_id')
    data.cotizacionId = idSearch.value

    if (!data.priceList) data.priceList = '0'

    const request = state == 'Agregar' ?
      (await insertTable(SUB_FORM.URL_CRUD, data, TOKEN)) :
      (await editeTable(SUB_FORM.URL_CRUD, data, TOKEN))

    if (request.response.status < 299) {
      showRows()
      stFormitems.setFormitems([])
    }

  }

  // REFRESCA VALORES DE LA TABLA

  const showRows = async () => {
    const idSearch = document.getElementById('form-cotizacion_id')
    const response = await searchTable(`${SUB_FORM.URL_CRUD}Search`, idSearch.value, TOKEN)
    stSubTable.setSubTable(...[response.data])
  }

  // CALCULA EL VALOR DEL ITEM DE LA COTIZACION

  const calculateCost = async (e) => {
    e.preventDefault()
    const formData = new FormData(document.getElementById('subForm-cot'))
    const dataForm = Object.fromEntries(formData.entries())


    if (dataForm.quantity && dataForm.price) {

      const quantity = parseInt(dataForm.quantity, 10)
      let costUnd = parseInt(dataForm.price, 10)
      let utilitis = parseFloat(dataForm.utilitis, 10)

      // EN CASO DE TENER LISTA DE PRECIOS ASOCIADA
      if (dataForm.priceList) {
        const request = await searchTable(`${config.url}/priceList_itemsSearch`, dataForm.priceList, TOKEN)

        let limit = []
        request.data.forEach(element => {
          limit.push(element.plItems_limit)
        });
        let priceList = 0
        for (let index = 0; index < limit.length; index++) {
          if (quantity >= limit[index]) {
            priceList = request.data[index].plItems_price
          }
        }
        costUnd = priceList
      }


      // EN CASO DE NO SER ASOCIADO A NINGUNA LISTA DE PRECIOS

      if (!utilitis) utilitis = 0
      const temporal = stFormitems.formitems
      temporal[3] = quantity
      temporal[4] = costUnd

      if (utilitis) {
        temporal[6] = utilitis
        temporal[7] = Math.round(((quantity * costUnd) * (1 + (utilitis / 100))))

      } else {
        temporal[7] = quantity * costUnd
        temporal[6] = utilitis
      }

      // REFRESCA LOS DATOS DEL FORMULARIO
      stFormitems.formitems.forEach((element, index) => {
        let input = document.getElementById(`${SUB_FORM.TITLE}_${SUB_FORM.CAMPOS[index].nameQuery}`)
        input.value = element
      });
    }
  }

  // LLAMA TABLA DE COSTOS

  const modalTableCost = (e) => {
    e.preventDefault()

    const formData = new FormData(document.getElementById('subForm-cot'))
    const dataForm = Object.fromEntries(formData.entries())

    const HEADERS = ['id', 'nombre', 'descripcion', 'und medida', 'precio und', 'utilidad']
    const URL_LIST = `${config.url}/priceList`

    setVerModal({
      estado: 'visible',
      item: {
        URL_CRUD: URL_LIST, HEADERS: HEADERS,
        nameForm: 'Lista de precios',
        modalFull: true,
        stFormitems: stFormitems,
        SUB_FORM: SUB_FORM,
        dataForm: Object.values(dataForm)
      }
    })
  }

  return (
    <>
      <form id='subForm-cot'>
        <h2 className='cot-h2'>Items de cotizacion</h2>
        <div className='cot-form'>
          {SUB_FORM.CAMPOS.map((element, x) => {
            return (
              <Campos key={x} items={element} index={x} modal={modal} nameId={SUB_FORM.TITLE} />
            )
          })}
        </div>
        <div className='cot-btn-content'>
          <button className='cot-table-btn-acction' onClick={acctionButton}>{state}</button>
          {state != 'Agregar' ? (
            <button className='cot-table-btn-close' onClick={cerrar}>Cerrar</button>
          ) : (<></>)}
          <button className='cot-table-btn-calcular' onClick={calculateCost}>Calcular</button>
          <button className='cot-table-btn-acction' onClick={modalTableCost}>Tabla de costo</button>
        </div>
      </form>
      {verModal.estado != 'oculto' ? (
        <ModalForm
          setModalStatus={setVerModal}
          modalStatus={verModal}
          nameId={SUB_FORM.TITLE}
        />
      ) : (<></>)}
    </>
  )
}

const Tabla = (props) => {
  const { SUB_FORM, TOKEN, stSubTable, stFormitems } = props
  const { HEADERS, URL_CRUD } = SUB_FORM

  useEffect(() => {
    showRows()
  }, []);

  const showRows = async () => {
    const idSearch = document.getElementById('form-cotizacion_id')
    const response = await searchTable(`${URL_CRUD}Search`, idSearch.value, TOKEN)
    stSubTable.setSubTable(...[response.data])
  }

  const deleteRows = async (row) => {
    const request = await deleteTable(URL_CRUD, row, TOKEN)
    if (request.response.status < 299) {
      showRows()
    }
  }

  // SELECIONA VALORES DE UNA FILA Y LOS ENVIA AL FORMULARIO POR MEDIO DEL CONTEXTO FORMACTIONS
  const selectRows = (row) => {
    stFormitems.setFormitems(row)
  }


  return (
    <div className='cot-content-table'>
      <table className='cot-table'>
        <thead>
          <tr>
            {HEADERS.map((item) => {
              return (
                <th key={item}>{item}</th>
              )
            })}
            <th>acciones</th>
          </tr>
        </thead>
        <tbody>
          {stSubTable.subTable.map((row, index) => {
            return (
              <tr key={index}>
                {Object.values(row).map((index, x) => {
                  return (
                    <td key={x}>{index}</td>
                  )
                })}
                <td>
                  <div>
                    <button className='cot-table-btn-acction' onClick={() => { selectRows(Object.values(row)) }}>Editar / ver</button>
                    <button className='cot-table-btn-close' onClick={() => { deleteRows(Object.values(row)[0]) }}>Eliminar</button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const TotalCost = (props) => {
  const { formActions, SUB_FORM, TOKEN, URL_CRUD, setQuery } = props

  useEffect(() => {
    editeForm()
  }, []);

  const editeForm = () => {
    const totalCot = formActions.form.values

    for (let index = 0; index < 3; index++) {
      let input = document.getElementById(`cot-costo_${index}`)
      input.value = totalCot[index + 5]
    }

  }

  const calculateCost = async (e) => {
    e.preventDefault()

    // SUAMOS TODOS LOS ITEMS DE LA COTIZACION

    const idSearch = document.getElementById('form-cotizacion_id')
    const response = await searchTable(`${SUB_FORM.URL_CRUD}Search`, idSearch.value, TOKEN)

    let subtotal = 0
    response.data.forEach(element => {
      subtotal = subtotal + element.cotItem_total
    });

    let input = document.getElementById('cot-costo_1')
    let cboTipo = document.getElementById('cboTipo')
    const valuesForm = formActions.form.values
    valuesForm[5] = subtotal
    valuesForm[6] = input.value

    if (cboTipo.value == 'neto') {
      valuesForm[7] = parseInt(subtotal) + parseInt(input.value)
    } else {
      valuesForm[7] = Math.round(parseInt(subtotal) * (1 + (parseInt(input.value) / 100)))
    }

    formActions.setForm({
      values: valuesForm,
      rows: formActions.form.rows
    })


    // // REFRESCAMOS DATOS EN PANTALLA
    editeForm()

  }

  const totalEdit = async (e) => {
    e.preventDefault()
    const idSearch = document.getElementById('form-cotizacion_id')
    const response = await searchTable(`${URL_CRUD}Search`, idSearch.value, TOKEN)
    const responseData = Object.values(response.data[0])

    const totalCot = formActions.form.values

    const data = {
      id: responseData[0],
      name: responseData[1],
      clientId: responseData[2],
      quantity: responseData[3],
      price: totalCot[5],
      cost: totalCot[6],
      total: totalCot[7]
    }

    const editResponse = await editeTable(URL_CRUD, data, TOKEN)

    setQuery(editResponse.data.message)
  }

  return (
    <div className='cot-totalcosto'>
      <h2>Coste de cotizacion</h2>
      <form>
        <div className='frTable-item-compuesto'>
          <label>sub total:</label>
          <input id='cot-costo_0' type='number' name='subTotal' placeholder='0' />
        </div>
        <div>
          <div className='frTable-item-compuesto-cbo'>
            <label>sobre costo:</label>
            <div>
              <input className='frTable-item-compuesto-txt-cbo'
                id='cot-costo_1' type='number' name='costo' placeholder='0' min={0} />
              <select id='cboTipo'>
                <option>neto</option>
                <option>porcentaje</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <div className='frTable-item-compuesto'>
            <label>total:</label>
            <input id='cot-costo_2' type='number' name='total' placeholder='0' />
          </div>
        </div>
        <div className='cot-btn-content'>
          <button className='cot-table-btn-calcular' onClick={calculateCost}>Calcular</button>
          <button className='cot-table-btn-acction' onClick={totalEdit}>Guardar</button>
        </div>
      </form>
    </div>
  )
}

export default CotizacionForm