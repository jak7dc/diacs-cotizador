/* eslint-disable react/prop-types */

import React from "react"
import { useState, useContext, createContext } from "react"

export const userContext = createContext()
export const useUserContext = () => useContext(userContext)

const initialState = {
  userName: 'yevgeny',
  token: 'eyJhbGciOiJIUzI1NiJ9.MQ.TuMyTBIOsRje6VeoC-P_uOTmubsXeRavG8eOuEBmAUw'
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