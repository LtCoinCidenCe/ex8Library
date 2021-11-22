import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const EditAuthor = ({ authors }) => {
  const [selection, setSelection] = useState(authors[0].name)
  const [born, SBT] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const handleAuthorUpdate = (event) => {
    event.preventDefault()

    const name = selection
    const setBornTo = Number(born)
    editAuthor({ variables: { name, setBornTo } })
    SBT('')
  }


  return <div>
    <h2>Set birthyear</h2>
    <form onSubmit={handleAuthorUpdate}>
      <div>
        name
        <select value={selection} onChange={(event) => setSelection(event.target.value)}>
          {authors.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
        </select>
      </div>
      <div>
        born
        <input type='number' value={born} onChange={(event) => SBT(event.target.value)} />
      </div>
      <div>
        <button type='submit'>update author</button>
      </div>
    </form>
  </div>
}

export default EditAuthor
