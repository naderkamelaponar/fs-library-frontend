/** بسم الله الرحمن الرحيم */
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, HttpLink, ApolloProvider, InMemoryCache} from '@apollo/client'
import App from './App'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('lib-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})
const httpLink =new HttpLink({
  uri: `http://localhost:4000/graphql`,
})
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
  })
client.resetStore()
ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'))
