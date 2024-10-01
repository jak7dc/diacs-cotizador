/* eslint-disable react/prop-types */
import '../../styles/general/showTable.css'
import React from "react";
import { useEffect, useState } from "react";
import { useUserContext } from "../../providers/UserContext";
import { useFormTContext } from "../../providers/FormTContext";
import { deleteTable, getTable, searchTable } from "../../api/general.crud";

export const ShowTable = (props) => {
  const { HEADERS, URL_CRUD, search, barSearch } = props

  const [userAcctions] = useUserContext()
  const [rows, setRows] = useState([]);
  const [formActions] = useFormTContext()

  useEffect(() => {
    showRows()
  }, [formActions.form, search]);


  // RENDERIZA LAS FILAS EN LA TABLA

  const showRows = async () => {
    if (search == undefined) {
      const request = await getTable(URL_CRUD, userAcctions.user.token)
      setRows(...[request.data])
    } else {
      if (search != 0) {
        const request = await searchTable(`${URL_CRUD}Search`, search, userAcctions.user.token)
        setRows(...[request.data])
      } else {
        setRows([])
      }
    }
  }

  // ELIMINA LAS TABLAS DE LA LISTA Y LLAMA AL METODO SHOWROWS
  const deleteRows = async (row) => {
    const request = await deleteTable(URL_CRUD, row, userAcctions.user.token)
    if (request.response.status < 299) {
      showRows()
    }
  }

  // SELECIONA VALORES DE UNA FILA Y LOS ENVIA AL FORMULARIO POR MEDIO DEL CONTEXTO FORMACTIONS
  const selectRows = (row) => {
    formActions.setForm({
      values: row,
      headers: {}
    })
  }

  // FILTRA LA BUSQUEDA DE TABLAS
  const searchRows = async (e) => {
    e.preventDefault()
    const formData = new FormData(document.getElementById('search-form'))
    const dataform = Object.fromEntries(formData.entries())

    let totalRows = []

    if (search == undefined) {
      const request = await getTable(URL_CRUD, userAcctions.user.token)
      totalRows = request.data
    } else {
      if (search != 0) {
        const request = await searchTable(`${URL_CRUD}Search`, search, userAcctions.user.token)
        totalRows = request.data
      } else {
        totalRows = []
      }
    }

    // CAPTURAMOS EL INDICE DE BUSQUEDA EN VALUE
    let value = 0
    for (let index = 0; index < HEADERS.length; index++) {
      if (HEADERS[index] == dataform.option) value = index
    }

    let newRows = []

    totalRows.forEach(element => {
      // CAPTURAMOS EL VALOR DE LA FILA Y LO CONVERTIMOS EN UN ARREGO QUE PODEMOS IDENTIFICAR
      let row = Object.values(element)

      // REALIZAMOS COMPARACION
      let isMatch = true
      try {
        isMatch = row[value].includes(dataform.value)
      } catch (error) {
        row[value] == dataform.value ? isMatch = true : isMatch = false
      }

      // COMPARAMOS SI EXISTE MATCH
      if (isMatch) newRows.push(element)
    });

    setRows(...[newRows])


  }

  return (
    <div>
      {/* BARRA DE BUSQUEDA */}
      {barSearch == true ?
        <form id='search-form' className="swTable-search-bar">
          <select name='option'>
            {HEADERS.map((item) => {
              return (
                <option key={item}>{item}</option>
              )
            })}
          </select>
          <input name='value' placeholder="buscar" />
          <button onClick={searchRows}>Buscar</button>
        </form>
        : <></>}
      <div>
        <table className='swTable-table'>
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
            {rows.map((row, index) => {
              return (
                <tr key={index}>
                  {Object.values(row).map((index, x) => {
                    return (
                      <td key={x}>{index}</td>
                    )
                  })}
                  <td>
                    <div>
                      <button className='swTable-btn-acction' onClick={() => { selectRows(Object.values(row)) }}>Editar / ver</button>
                      <button className='swTable-btn-close' onClick={() => { deleteRows(Object.values(row)[0]) }}>Eliminar</button>
                    </div>
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
