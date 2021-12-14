import { useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthContext from '../../store/AuthContext'
import Errors from '../Errors/Errors'

const AuthForm = () => {
  const navigate = useNavigate()
  const usernameRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const authContext = useContext(AuthContext)

  const [loggingIn, setLoggingIn] = useState(true)
  const [errors, setErrors] = useState({})

  const switchModeHandler = () => {
    setLoggingIn((prevState) => !prevState)
    setErrors({})
  }

  const endpoint = loggingIn ? '/api/signin' : '/api/signup'

  async function submitHandler(event: { preventDefault: () => void }) {
    event.preventDefault()
    setErrors({})

    const usernameValue = usernameRef.current !== null ? usernameRef.current.value : ''
    const passwordValue = passwordRef.current !== null ? passwordRef.current.value : ''

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({
          Username: usernameValue,
          Password: passwordValue
        }),
        headers: {
          'Access-Control-Allow-Headers': 'POST, GET, OPTIONS',
          'Content-type': 'application/json'
        }
      })
      const data = await response.json()
      if (!response.ok) {
        const errorText = loggingIn ? 'Login failed' : 'Sign up failed'
        if (!Object.prototype.hasOwnProperty.call(data, 'error')) {
          throw new Error(errorText)
        }
        if (typeof data.error === 'string') {
          setErrors({ unknown: data.error })
        } else {
          setErrors(data.error)
        }
      } else {
        authContext.login(data.jwt)
        navigate('/')
      }
    } catch (error: any) {
      // TODO: error Types
      setErrors({ error: error.message })
    }
  }

  const header = loggingIn ? 'Login' : 'Sign up'
  const mainButtonText = loggingIn ? 'Login' : 'Create account'
  const switchModeButtonText = loggingIn ? 'Create new account' : 'Login with existing account'
  const errorContent = Object.keys(errors).length === 0 ? null : Errors(errors)

  return (
    <section>
      <h1 className='text-center'>{header}</h1>
      <div className='container w-50'>
        <form onSubmit={submitHandler}>
          <div className='form-group pb-3'>
            <label htmlFor='username'>
              Username
              <input id='username' type='text' className='form-control' required ref={usernameRef} />
            </label>
          </div>
          <div className='form-group pb-3'>
            <label htmlFor='password'>
              Password
              <input id='password' type='password' className='form-control' required ref={passwordRef} />
            </label>
          </div>
          <div className='pt-3 d-flex justify-content-between'>
            <button type='submit' className='btn btn-success'>
              {mainButtonText}
            </button>
            <button type='button' className='btn btn-link' onClick={switchModeHandler}>
              {switchModeButtonText}
            </button>
          </div>
        </form>
        {errorContent}
      </div>
    </section>
  )
}

export default AuthForm
