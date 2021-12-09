import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'

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
        <button onClick={() => setPage('add')} style={token ? null : { display: 'none' }}>add book</button>
        <button onClick={() => setPage('recommend')} style={token ? null : { display: 'none' }}>recommend</button>
        <button onClick={() => setPage('login')} style={token ? { display: 'none' } : null}>login</button>
        <button onClick={logout} style={token ? null : { display: 'none' }}>logout</button>
      </div>

      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Login show={page === 'login'} setToken={setToken} setPage={setPage} />
      {token ? <Recommend show={page === 'recommend'} /> : null}
      {/* cache for Recommend is just too terrible if it is on all the time */}
    </div>
  )
}

export default App
