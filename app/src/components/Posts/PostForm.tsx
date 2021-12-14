import { useState, useContext, useEffect, useCallback } from 'react'

import AuthContext from '../../store/AuthContext'
import Errors from '../Errors/Errors'

const PostForm = (props: any) => {
  const authContext = useContext(AuthContext)

  const [titleValue, setTitleValue] = useState('')
  const [contentValue, setContentValue] = useState('')

  const [errors, setErrors] = useState({})

  const {
    post,
    post: { Title, Content, ID },
    onAddPost,
    onEditPost
  } = props

  const populateFields = useCallback(() => {
    if (post) {
      setTitleValue(Title)
      setContentValue(Content)
    }
  }, [Content, Title, post])

  useEffect(() => {
    populateFields()
  }, [populateFields])

  async function submitHandler(event: { preventDefault: () => void }) {
    event.preventDefault()
    setErrors({})

    try {
      const method = onEditPost ? 'PUT' : 'POST'
      const body = {
        Title: titleValue,
        Content: contentValue,
        ID: ''
      }
      if (onEditPost) {
        body.ID = ID
      }
      const response = await fetch('api/posts', {
        method,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
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
        setTitleValue('')
        setContentValue('')
        if (onAddPost) {
          onAddPost(data.data)
        }
        if (onEditPost) {
          onEditPost(data.data)
        }
      }
    } catch (error: any) {
      setErrors({ error: error.message })
    }
  }

  const titleChangeHandler = (event: any) => {
    setTitleValue(event.target.value)
  }
  const contentChangeHandler = (event: any) => {
    setContentValue(event.target.value)
  }

  const errorContent = Object.keys(errors).length === 0 ? null : Errors(errors)
  const submitButtonText = onEditPost ? 'Update Post' : 'Add Post'

  return (
    <section>
      <div className='container w-75 pb-4'>
        <form onSubmit={submitHandler}>
          <div className='form-group pb-3'>
            <label htmlFor='title'>
              Title
              <input
                id='title'
                type='text'
                className='form-control'
                required
                value={titleValue}
                onChange={titleChangeHandler}
              />
            </label>
          </div>
          <div className='form-group pb-3'>
            <label htmlFor='content'>
              Content
              <textarea
                id='content'
                className='form-control'
                rows={5}
                required
                value={contentValue}
                onChange={contentChangeHandler}
              />
            </label>
          </div>
          <button type='submit' className='btn btn-success'>
            {submitButtonText}
          </button>
        </form>
        {errorContent}
      </div>
    </section>
  )
}

export default PostForm
