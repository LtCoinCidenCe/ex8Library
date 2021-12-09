import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const logout = () => {
    setPage('authors')
    setToken(null)
    localStorage.removeItem('kirjastoKirjoittajat')
  }
  
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')} style={{ display: token ? 'initial' : 'none' }}>add book</button>
        <button onClick={() => setPage('login')} style={{ display: token ? 'none' : 'initial' }}>login</button>
        <button onClick={logout} style={{ display: token ? 'initial' : 'none' }}>logout</button>
      </div>

      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Login show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App
