/* eslint-disable react/prop-types */
import React from "react"
import '../../styles/general/modal.css'
import { useEffect, useState } from "react"
import { useUserContext } from "../../providers/UserContext"
import { getTable } from "../../api/general.crud"

export const ModalForm = (props) => {
  const { setModalStatus, modalStatus, nameId } = props
  const { item } = modalStatus
  const [rows, setRows] = useState([]);
  const [userAcctions] = useUserContext()

  useEffect(() => {
    // console.log(modalStatus)
    showRows()
  }, []);

  // RENDERIZA LAS FILAS EN LA TABLA

  const showRows = async () => {
    const request = await getTable(item.URL_CRUD, userAcctions.user.token)
    setRows(...[request.data])
  }

  // SELECCIONA LA FILA Y PASA LOS DATOS AL FORMULARIO

  const selectRow = (row) => {
    const inputId = document.getElementById(`${nameId}_${item.nameQuery}`)
    inputId.value = row[0]
    const inputAux = document.getElementById(`${nameId}_${item.nameQuery}_aux`)
    inputAux.value = row[1]
    setModalStatus({ estado: 'oculto' })
  }

  return (
    <div className="modal-form">
      <div className="modal-content">
        <h2 className="modal-h2">Seleciona item</h2>
        <table className="modal-table">
          <thead>
            <tr>
              {item.HEADERS.map((header, index) => {
                return (
                  <th key={index}>{header}</th>
                )
              })}
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
                  <td><button className="modal-btn-acction" onClick={() => { selectRow(Object.values(row)) }}>Select</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <button className="modal-btn-close" onClick={() => { setModalStatus({ estado: 'oculto' }) }} >cerrar</button>
      </div>
    </div>
  )
}
