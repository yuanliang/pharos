import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import PostsPage from './pages/PostsPage'
import AuthContext from './store/AuthContext'
import './App.css'

const App = () => {

  const authContext = useContext(AuthContext)
  const { loggedIn } = authContext

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        {!loggedIn && <Route path='/auth' element={<AuthPage />} />}
        <Route path='/posts' element={loggedIn ? <PostsPage /> : <Navigate to='/auth' />} />
        <Route path='*' element={<Navigate to='/auth' />} />
      </Routes>
    </Layout>
  )
}

export default App
