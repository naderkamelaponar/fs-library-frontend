import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <div >
      <header style={{"textAlign":"center"}}>
        <h1>بسم الله الرحمن الرحيم</h1>
        <h3>library frontend ex 8.11 - 8.12</h3>
      </header>
      <div style={{"textAlign":"center"}}>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <div >
      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
      </div>
    </div>
  )
}

export default App
