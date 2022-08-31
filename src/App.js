/** بسم الله الرحمن الرحيم */
import {    useApolloClient ,useSubscription 
} from '@apollo/client'
import { useState } from 'react'
import Authors from './components/authors/Authors'
import Books from './components/books/Books'
import Login from './components/users/Login'
import NewBook from './components/books/NewBook'
import CreateUser from './components/users/CreateUser'
import Favourite from './components/users/Favourite'
import HeaderButtons from './components/utils/HeaderButtons'
import gqlQueries from './queries'
const App = () => {
  const [page, setPage] = useState('authors')
  const [token,setToken] = useState(localStorage.getItem('lib-user-token'))
  const client = useApolloClient()
  const [liveDataC,setLiveDataC] = useState(0)
  const [notify,setNotify] = useState('')
  useSubscription(gqlQueries.booksQueries.NEW_BOOK, {
    onSubscriptionData: ({ subscriptionData }) => {
      const subData = subscriptionData.data ?  subscriptionData.data.newBook :null
      document.title = 'a new book added'
      setLiveDataC(liveDataC+1)
      setNotify(`a new book for ${subData.author.name} was added`)
    }
  })
  const authorize =(value)=>{
    setToken(value)
    setPage('favourite')
    localStorage.setItem('lib-user-token', value)
  }
  const goToPage= (value)=>{
    setPage(value)
  }
  const resetLiveDataC= ()=>{
    document.title = 'Nader Kamel'
    setLiveDataC(0)
    setNotify('')
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
        <h3>library frontend ex 8.22 - 8.26</h3>
        <HeaderButtons token={token} goToPage={goToPage} 
        LogOut= {LogOut} liveDataC={liveDataC} resetLiveDataC={resetLiveDataC}
        />
      </header>
      <div >
        {notify && notify}
      <Authors show={page === 'authors'}  />
      <Books show={page === 'books'}/>
      <NewBook show={page === 'add'} />
      <Login show={page === 'login'} 
      authorize={authorize}/>
      <CreateUser show={page === 'createUser' } authorize={authorize}/>
      <Favourite show ={page === 'favourite'} />
      </div>
    </div>
  )
}

export default App
