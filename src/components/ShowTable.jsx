/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useUserContext } from "../providers/UserContext";
import { useFormTContext } from "../providers/FormTContext";

export const ShowTable = (props) => {
  const { HEADERS, URL_CRUD } = props
  const [userAcctions] = useUserContext()
  const [rows, setRows] = useState([]);
  const [formActions] = useFormTContext()

  useEffect(() => {
    getRows()
  }, [formActions.form]);

  const getRows = async () => {
    const response = await fetch(URL_CRUD, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userAcctions.user.token}`
      }
    })
    const data = await response.json()
    setRows(...[data])
  }

  const deleteRows = async (row) => {
    const response = await fetch(URL_CRUD, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userAcctions.user.token}`
      },
      body: JSON.stringify({ id: row })
    })

    if (response.status < 299) {
      getRows()
    }
  }

  const editRows = (row) => {
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
              <td><button onClick={() => { editRows(Object.values(row)) }}>Edit</button></td>
              <td><button onClick={() => { deleteRows(Object.values(row)[0]) }}>Delete</button></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
