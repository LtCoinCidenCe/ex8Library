import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = ({ show }) => {
  const bookResults = useQuery(ALL_BOOKS)
  const meResults = useQuery(ME, { fetchPolicy: 'network-only' })

  if (!show)
    return null
  if (bookResults.loading)
    return <div>loading...</div>
  if (meResults.loading)
    return <div>loading...</div>
  const books = bookResults.data.allBooks
  const favorite = meResults.data.me.favoriteGenre
  const myBooks = books.filter(yksibook => yksibook.genres.includes(favorite))

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{favorite}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th><th>author</th><th>published</th>
          </tr>
          {myBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
