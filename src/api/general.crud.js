export const insertTable = async (URL_CRUD, dataForm, token) => {
  const response = await fetch(URL_CRUD, {
    method: 'POST',
    body: JSON.stringify(dataForm),
    headers: {
      'Content-type': 'Application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  const data = await response.json()
  return ({ data, response })
}

export const editeTable = async (URL_CRUD, dataForm, token) => {
  const response = await fetch(URL_CRUD, {
    method: 'PUT',
    body: JSON.stringify(dataForm),
    headers: {
      'Content-type': 'Application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  const data = await response.json()
  return ({ data, response })
}

export const getTable = async (URL_CRUD, token) => {
  const response = await fetch(URL_CRUD, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  const data = await response.json()

  return ({ data, response })
}

export const deleteTable = async (URL_CRUD, id, token) => {
  const response = await fetch(URL_CRUD, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ id: id })
  })

  const data = await response.json()

  return ({ data, response })
}

export const searchTable = async(URL_CRUD, id, token)=>{
  const response = await fetch(URL_CRUD, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ search: id })
  })

  const data = await response.json()

  return ({ data, response })
}