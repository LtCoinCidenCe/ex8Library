import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'

const Books = (props) => {
  const bookResults = useQuery(ALL_BOOKS)
  const [chosenGenre, setChosenGenre] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedBookIn = (set, object) => set.map(p => p.title).includes(object.title)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedBookIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }
  
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
      alert('new book added from other client')
    }
  })

  if (!props.show)
    return null
  if (bookResults.loading)
    return <div>loading...</div>

  const books = bookResults.data.allBooks
  const genreSet = new Set()
  for (const yksbook of books) {
    for (const genre of yksbook.genres) {
      genreSet.add(genre)
    }
  }
  const genreBooks = chosenGenre ? books.filter(yksibook => yksibook.genres.includes(chosenGenre)) : books
  // console.log(genreSet)

  return (
    <div>
      <h2>books</h2>
      {chosenGenre ? <p>in genre <b>{chosenGenre}</b></p> : null}
      <table>
        <tbody>
          <tr>
            <th></th><th>author</th><th>published</th>
          </tr>
          {genreBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>{[...genreSet].map(g =>
        <button key={g}
          onClick={() => setChosenGenre(g)}
          style={g === chosenGenre ? { backgroundColor: 'ivory' } : null}>{g}</button>)}
        <button onClick={() => setChosenGenre(null)}>clear selection</button>
      </div>
    </div>
  )
}

export default Books
