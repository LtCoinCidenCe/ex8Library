import { useMutation } from '@apollo/client'
import React from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const EditAuthor = () => {
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const handleAuthorUpdate = (event) => {
    event.preventDefault()

    // uncontrolled style
    const name = event.target.name.value
    const setBornTo = Number(event.target.born.value)
    editAuthor({ variables: { name, setBornTo } })

    event.target.name.value = ''
    event.target.born.value = ''
  }


  return <div>
    <h2>Set birthyear</h2>
    <form onSubmit={handleAuthorUpdate}>
      <div>
        name
        <input type='text' name='name' />
      </div>
      <div>
        born
        <input type='number' name='born' />
      </div>
      <div>
        <button type='submit'>update author</button>
      </div>
    </form>
  </div>
}

export default EditAuthor
