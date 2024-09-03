/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useUserContext } from "../providers/UserContext"
import { getTable } from "../api/inventario"

export const ModalForm = (props) => {
  const { setModalStatus, modalStatus } = props
  const { item } = modalStatus
  const [rows, setRows] = useState([]);
  const [userAcctions] = useUserContext()

  useEffect(() => {
    console.log(modalStatus)
    showRows()
  }, []);

  // RENDERIZA LAS FILAS EN LA TABLA

  const showRows = async () => {
    const request = await getTable(item.URL_CRUD, userAcctions.user.token)
    setRows(...[request.data])
  }

  // SELECCIONA LA FILA Y PASA LOS DATOS AL FORMULARIO

  const selectRow = (row) => {
    const inputId = document.getElementById(item.nameQuery)
    inputId.value = row[0]
    const inputAux = document.getElementById(`${item.nameQuery}_aux`)
    inputAux.value = row[1]
    setModalStatus({ estado: 'oculto' })
  }

  return (
    <div>
      ModalForm
      <button onClick={() => { setModalStatus({ estado: 'oculto' }) }} >cerrar</button>
      <table>
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
                <td><button onClick={() => { selectRow(Object.values(row)) }}>Select</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
