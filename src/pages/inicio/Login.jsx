import '../../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../providers/UserContext'
import config from '../../config.js'
import { useState } from 'react'

export const Login = () => {
  const navigate = useNavigate()
  const [userActions] = useUserContext()
  const [errorMsg, setErrorMsg] = useState('');

  const getLogin = async (e) => {
    e.preventDefault()
    const formdata = new FormData(e.target)
    const dataForm = Object.fromEntries(formdata.entries())

    const response = await fetch(`${config.url}/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(dataForm)
    })

    const data = await response.json()

    const user = {
      userName: dataForm.username,
      token: data.token
    }

    if (response.status > 299) {
      setErrorMsg(data.message)
    }
    if (data.token) {
      userActions.setUser(user)
      navigate('/dashboard')
    }

  }

  return (
    <>
      <div className='content-form'>
        <form onSubmit={getLogin} className='login-form'>

          <input name='username' className='login-input' type="text" placeholder="username" />
          <input name='password' className='login-input' type="text" placeholder="password" />
          <input type="submit" value="Iniciar sesion" className='btn-form' />
          <Link to='/register'>registrarme</Link>
          {errorMsg ? <label>{errorMsg}</label> : null}
        </form>
      </div>
    </>
  )
}
