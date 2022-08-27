/** بسم الله الرحمن الرحيم */
import { useApolloClient } from '@apollo/client'
import { useState } from 'react'
import Authors from './components/authors/Authors'
import Books from './components/books/Books'
import Login from './components/users/Login'
import NewBook from './components/books/NewBook'
import CreateUser from './components/users/CreateUser'
import Favourite from './components/users/Favourite'
import HeaderButtons from './components/utils/HeaderButtons'
const App = () => {
  const [page, setPage] = useState('authors')
  const [token,setToken] = useState(localStorage.getItem('lib-user-token'))
  const client = useApolloClient()
  const authorize =(value)=>{
    setToken(value)
    localStorage.setItem('lib-user-token', value)
    setPage('favourite')
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
        <h3>library frontend ex 8.21 - 8.22</h3>
        <HeaderButtons token={token} goToPage={goToPage} 
        LogOut= {LogOut} 
        />
      </header>
      <div >
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Login show={page === 'login'} 
      authorize={authorize}/>
      <CreateUser show={page === 'createUser' }/>
      <Favourite show ={page === 'favourite'} />
      </div>
    </div>
  )
}

export default App
