import uuidv4 from 'uuid/v4'
import gql from 'graphql-tag'
import { GET_PAGE_ITEMS } from './components/Pages/Add/SortableList'
import { GET_BLOCK_ITEM } from './components/Pages/Add/Sections/Block'

export const resolvers = {
  Query: {
    blockItem: (_root, variables, { cache }) => {
      const { orderKey } = variables

      const query = gql`
        query GetBlockItems {
          blockItems @client {
            id
            title
            image
            video
            style
            content
          }
        }
      `

      const cachedData = cache.readQuery({ query })

      const blockItem = cachedData.blockItems.filter(
        item => item.id === orderKey
      )[0]

      return blockItem
    },
  },
  Mutation: {
    orderPageItems: (_root, variables, { cache }) => {
      const { orderKeys } = variables
      const previous = cache.readQuery({ query: GET_PAGE_ITEMS })

      const data = {
        pageItems: [],
      }

      orderKeys.forEach(orderKey => {
        previous.pageItems.forEach(item => {
          if (item.orderKey === orderKey) data.pageItems.push(item)
        })
      })

      cache.writeQuery({ query: GET_PAGE_ITEMS, data })

      return data
    },
    addPageItem: (_root, variables, { cache }) => {
      const { type } = variables
      const previous = cache.readQuery({ query: GET_PAGE_ITEMS })
      const previousPageItems = previous.pageItems
      const newItem = {
        type,
        orderKey: uuidv4(),
        __typename: 'PageItem',
      }

      let data = {
        pageItems: [...previousPageItems, newItem],
      }

      cache.writeQuery({ query: GET_PAGE_ITEMS, data })

      // block

      const query = gql`
        query GetBlockItems {
          blockItems @client {
            id
            title
            image
            video
            style
            content
          }
        }
      `

      const existingBlocks = cache.readQuery({ query })

      const newBlock = {
        id: newItem.orderKey,
        title: '',
        content: '',
        image: '',
        video: '',
        style: '',
        __typename: 'BlockItem',
      }

      data = {
        blockItems: [...existingBlocks.blockItems, newBlock],
      }

      cache.writeQuery({ query, data })
      return data
    },
    updateBlockItem: (_root, variables, { cache, getCacheKey }) => {
      const { name, value, orderKey } = variables

      const id = getCacheKey({ __typename: 'BlockItem', id: orderKey })
      const fragment = gql`
        fragment updateItem on BlockItem {
          ${name}
        }
      `
      const previous = cache.readFragment({ fragment, id })

      const data = { ...previous, [`${name}`]: value }
      cache.writeData({ id, data })
    },
  },
}
