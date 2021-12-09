import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_AUTHORS } from '../queries'
import EditAuthor from './EditAuthor'

const Authors = (props) => {
  const authorResults = useQuery(ALL_AUTHORS)
  if (!props.show)
    return null
  if (authorResults.loading)
    return <div>loading...</div>

  const authors = authorResults.data.allAuthors
  // in <EditAuthor/> authors should have length > 0 or else array out of index
  const showEditor = () => authors.length > 0 && props.token ? <EditAuthor authors={authors} /> : <p>login to edit author's birthdate</p>

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th><th>born</th><th>books</th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {showEditor()}
    </div>
  )
}

export default Authors
