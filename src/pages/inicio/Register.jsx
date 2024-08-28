import { Link, useNavigate } from 'react-router-dom'
import '../../styles/login.css'
import { useState } from 'react'
import config from '../../config'

export const Register = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate()


  const getLogin = async (e) => {
    e.preventDefault()
    const formdata = new FormData(e.target)
    const dataForm = Object.fromEntries(formdata.entries())

    if (dataForm.password != dataForm.repeat) return (setErrorMsg('password not is match'))

    const response = await fetch(`${config.url}/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(dataForm)
    })

    const data = await response.json()

    if (response.status > 299) return (setErrorMsg(data.message))


    navigate('/')

  }

  return (
    <>
      <div className='content-form'>
        <form onSubmit={getLogin} className='login-form'>

          <input name='username' className='login-input' type="text" placeholder="username" />
          <input name='password' className='login-input' type="text" placeholder="password" />
          <input name='repeat' className='login-input' type='text' placeholder='repeat password' />
          <input type="submit" value="Iniciar sesion" className='btn-form' />
          <Link to='/'>Login</Link>
          {errorMsg ? <label>{errorMsg}</label> : null}
        </form>
      </div>
    </>
  )
}
