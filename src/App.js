import { useApolloClient } from '@apollo/client'
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
const App = () => {
  const [page, setPage] = useState('authors')
  const [token,setToken] = useState(localStorage.getItem('lib-user-token'))
  const client = useApolloClient()
  const authorize =(value)=>{
    if (!value) return 
    setToken(value)
    localStorage.setItem('lib-user-token', value)
    setPage('authors')
  }
  const LogOut=()=>{
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }
  return (
    <div >
      <header style={{"textAlign":"center"}}>
        <h1>بسم الله الرحمن الرحيم</h1>
        <h3>library frontend ex 8.11 - 8.12</h3>
      </header>
      <div style={{"textAlign":"center"}}>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token? <button onClick={() => setPage('add')}>add book</button>:<button onClick={() => setPage('login')}>Login</button>}
        {token && <button onClick={LogOut}>LogOut</button>}
        
        
      </div>
      <div >
      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      {token && <NewBook show={page === 'add'} /> }
      {!token && <Login show={page === 'login'} authorize={authorize}/>}
      
      </div>
    </div>
  )
}

export default App
