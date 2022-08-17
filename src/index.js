/** بسم الله الرحمن الرحيم */
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, HttpLink, ApolloProvider, InMemoryCache} from '@apollo/client'
import App from './App'
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `http://localhost:4000/graphql`,
    })
  })

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'))
