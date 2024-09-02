/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext } from "react"
import { useState } from "react"

export const formTContext = createContext()
export const useFormTContext = () => useContext(formTContext)

const initialState = {
  values: '',
  rows: []
}

export const FormTContext = ({ children }) => {
  const [form, setForm] = useState(initialState);

  const formActions = {
    form,
    setForm,
    clearForm: () => {
      setForm({
        values: '',
        rows: []
      })
    }
  }

  return (
    <formTContext.Provider value={[formActions]}>
      {children}
    </formTContext.Provider>
  )
}
