/** بسم الله الرحمن الرحيم */
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, HttpLink, ApolloProvider, InMemoryCache ,split} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import { setContext } from '@apollo/client/link/context'
import App from './App'
const token = localStorage.getItem('lib-user-token')
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
  
})
const uri = process.env['REACT_APP_URI'] ?process.env['REACT_APP_URI'] : 'http://localhost:4000/graphql'
const httpLink =new HttpLink({
  uri,
})
let ws = process.env['REACT_APP_URI'] ? process.env['REACT_APP_URI'].split(":")[1]:null
ws = ws? 'ws:'+ws:'ws://localhost:4000/graphql'
console.log(ws)
  const wsLink = new WebSocketLink({
    uri: ws,
    options: {
      reconnect: true
    }
  })
  
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    authLink.concat(httpLink),
  )
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink
})

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'))
