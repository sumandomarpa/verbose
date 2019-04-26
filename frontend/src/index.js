import React from 'react'
import ReactDOM from 'react-dom'
import { createUploadLink } from 'apollo-upload-client'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import shortid from 'shortid'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import { resolvers } from './resolvers'

const cache = new InMemoryCache()
const link = createUploadLink({
  uri: 'http://localhost:4400/',
  credentials: 'include',
})

const client = new ApolloClient({
  cache,
  link,
  resolvers,
})

const blockId = shortid.generate()
const pageId = shortid.generate()
const faqId = shortid.generate()
cache.writeData({
  data: {
    page: {
      id: pageId,
      title: '',
      slug: '',
      image: '',
      vertical: 'home-loans',
      type: 'NEWS',
      __typename: 'Page',
    },
    pageItems: [
      { type: 'Block', itemId: blockId, pageId, __typename: 'PageItem' },
    ],
    blocks: [
      {
        id: blockId,
        title: '',
        content: '<p></p>',
        image: '',
        video: '',
        style: 'full-width',
        __typename: 'Block',
      },
    ],
    boxes: [],
    prosAndCons: [],
    faq: {
      id: faqId,
      title: '',
      slug: '',
      description: '',
      short_description: '',
      order: '',
      vertical: 'home-loans',
      __typename: 'Faq',
    },
  },
})

client.replaceStore = data => cache.writeData(data)
client.onResetStore = data => cache.writeData(data)

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
