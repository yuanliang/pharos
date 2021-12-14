import { useState, useContext } from 'react'

import AuthContext from '../../store/AuthContext'
import Errors from '../Errors/Errors'
import PostForm from './PostForm'

const Post = (props: any) => {
  const [editing, setEditing] = useState(false)
  const [errors, setErrors] = useState({})

  const authContext = useContext(AuthContext)

  const switchModeHandler = () => {
    setEditing((prevState) => !prevState)
    setErrors({})
  }

  const {
    post,
    post: { Title, Content, ID },
    onDeletePost,
    onEditPost

  } = props

  async function deleteHandler() {
    try {
      const response = await fetch(`api/posts/${ID}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authContext.token}`
        }
      })
      const data = await response.json()
      if (!response.ok) {
        const errorText = 'Failed to add new post.'
        if (!Object.prototype.hasOwnProperty.call(data, 'error')) {
          throw new Error(errorText)
        }
        if (typeof data.error === 'string') {
          setErrors({ unknown: data.error })
        } else {
          setErrors(data.error)
        }
      } else {
        onDeletePost(ID)
      }
    } catch (error: any) {
      setErrors({ error: error.message })
    }
  }

  const editPostHandler = () => {
    setEditing(false)
    onEditPost()
  }

  const cardTitle = editing ? 'Edit post' : Title
  const cardBody = editing ? <PostForm post={post} onEditPost={editPostHandler} editing /> : Content
  const switchModeButtonText = editing ? 'Cancel' : 'Edit'
  const cardButtons = editing ? (
    <div className='container'>
      <button type='button' className='btn btn-link' onClick={switchModeHandler}>
        {switchModeButtonText}
      </button>
      <button type='button' className='btn btn-danger float-right mx-3' onClick={deleteHandler}>
        Delete
      </button>
    </div>
  ) : (
    <div className='container'>
      <button type='button' className='btn btn-link' onClick={switchModeHandler}>
        {switchModeButtonText}
      </button>
      <button type='button' className='btn btn-danger float-right mx-3' onClick={deleteHandler}>
        Delete
      </button>
    </div>
  )
  const errorContent = Object.keys(errors).length === 0 ? null : Errors(errors)

  return (
    <div className='card mb-5 pb-2'>
      <div className='card-header'>{cardTitle}</div>
      <div className='card-body'>{cardBody}</div>
      {cardButtons}
      {errorContent}
    </div>
  )
}

export default Post
