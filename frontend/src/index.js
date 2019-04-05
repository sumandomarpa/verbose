import React from 'react'
import ReactDOM from 'react-dom'
import uuidv4 from 'uuid/v4'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import { resolvers } from './resolvers'

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: 'http://localhost:4400/',
  credentials: 'include',
})

const client = new ApolloClient({
  cache,
  link,
  resolvers,
})

const orderKey = uuidv4()
cache.writeData({
  data: {
    pageItems: [{ type: 'block', orderKey, __typename: 'PageItem' }],
    blockItems: [
      {
        id: orderKey,
        title: '',
        content: '',
        image: '',
        video: '',
        style: '',
        __typename: 'BlockItem',
      },
    ],
  },
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
