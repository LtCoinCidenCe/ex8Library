import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = ({ show }) => {
  const [loadBook, bookResults] = useLazyQuery(ALL_BOOKS)
  const meResults = useQuery(ME, { fetchPolicy: 'network-only' })
  const [myBooks, setMyBooks] = useState(null)

  useEffect(() => {
    // console.log('bookResults:', bookResults.data)
    if (bookResults.data)
      setMyBooks(bookResults.data.allBooks)
  }, [bookResults.data])
  useEffect(() => {
    // console.log('me:', meResults.data)
    if (meResults.data)
      loadBook({ variables: { genre: meResults.data.me.favoriteGenre } })
  }, [meResults.data]) // eslint-disable-line

  if (!show)
    return null
  
  if (!myBooks)
    return <div>not ready...</div>
    
  const favorite = meResults.data.me.favoriteGenre
  
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
