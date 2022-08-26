import { useApolloClient } from '@apollo/client'
import { useState } from 'react'
import Authors from './components/authors/Authors'
import Books from './components/books/Books'
import Login from './components/users/Login'
import NewBook from './components/books/NewBook'
import CreateUser from './components/users/CreateUser'
import Recomended from './components/users/Recomended'
const HeaderButtons =({token,goToPage,LogOut}) =>{
  return (
    <div style={{"textAlign":"center"}}>
    <button onClick={() => goToPage('authors')}>authors</button>
    <button onClick={() => goToPage('books')}>books</button>
    {token && <button onClick={() => goToPage('add')}>add book</button>} 
    {token && <button onClick={() => goToPage('recomended')}>recomended</button>}
    {!token && <button onClick={() => goToPage('login')}>Login</button>}
    {!token && <button onClick={() => goToPage('createUser')}>new user</button>}
    {token && <button onClick={LogOut}>LogOut</button>}
  </div>
  )

}
const App = () => {
  const [page, setPage] = useState('authors')
  const [token,setToken] = useState(localStorage.getItem('lib-user-token'))
  const client = useApolloClient()
  const authorize =(value)=>{
    setToken(value)
    localStorage.setItem('lib-user-token', value)
    setPage('authors')
  }
  const goToPage= (value)=>{
    setPage(value)
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
        <h3>library frontend ex 8.17 - 8.19</h3>
      </header>
      <HeaderButtons token={token} goToPage={goToPage} 
        LogOut= {LogOut} 
      />
      <div >
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Login show={page === 'login'} 
      authorize={authorize}/>
      <CreateUser show={page === 'createUser' }/>
      <Recomended show ={page === 'recomended'} />
      </div>
    </div>
  )
}

export default App
