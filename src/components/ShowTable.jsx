/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useUserContext } from "../providers/UserContext";
import { useFormTContext } from "../providers/FormTContext";
import { deleteTable, getTable } from "../api/inventario";

export const ShowTable = (props) => {
  const { HEADERS, URL_CRUD } = props
  const [userAcctions] = useUserContext()
  const [rows, setRows] = useState([]);
  const [formActions] = useFormTContext()

  useEffect(() => {
    showRows()
  }, [formActions.form]);


  // RENDERIZA LAS FILAS EN LA TABLA

  const showRows = async () => {
    const request = await getTable(URL_CRUD, userAcctions.user.token)
    setRows(...[request.data])
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

  return (
    <table>
      <thead>
        <tr>
          {HEADERS.map((item) => {
            return (
              <th key={item}>{item}</th>
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
              <td><button onClick={() => { selectRows(Object.values(row)) }}>Edit</button></td>
              <td><button onClick={() => { deleteRows(Object.values(row)[0]) }}>Delete</button></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
