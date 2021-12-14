import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import AuthContext from '../../store/AuthContext'

const NavigationBar = () => {
  const authContext = useContext(AuthContext)

  const { loggedIn } = authContext
  const navigate = useNavigate()

  const logoutHandler = () => {
    authContext.logout()
    navigate('/', { replace: true })
  }

  return (
    <nav className='navbar navbar-expand-md navbar-dark fixed-top bg-dark'>
      <button
        type='button'
        className='navbar-toggler'
        data-toggle='collapse'
        data-target='#navbarCollapse'
        aria-controls='navbarCollapse'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'> </span>
      </button>
      <div className='collapse navbar-collapse justify-content-between' id='navbarCollapse'>
        <div className='d-flex flex-row'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                PHAROS
              </Link>
            </li>
            {loggedIn && (
              <li className='nav-item'>
                <Link className='nav-link' to='/posts'>
                  My posts
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className='d-flex flex-row justify-content-end'>
          <ul className='navbar-nav mr-auto'>
            {!loggedIn && (
              <li className='nav-item'>
                <Link className='nav-link' to='/auth'>
                  Login
                </Link>
              </li>
            )}
            {loggedIn && (
              <li className='nav-item'>
                <button type='button' className='btn btn-dark' onClick={logoutHandler}>
                  LOGOUT
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar
