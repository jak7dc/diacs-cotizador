/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { useState, useContext, createContext } from "react"

export const userContext = createContext()
export const useUserContext = () => useContext(userContext)

const initialState = {
  userName: '',
  token: ''
}

export const UserContext = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const userClear = () => {
    setUser(initialState)
  }

  const userActions = {
    user,
    setUser,
    userClear
  }
  return (
    <userContext.Provider value={[userActions]}>
      {children}
    </userContext.Provider>
  )
}