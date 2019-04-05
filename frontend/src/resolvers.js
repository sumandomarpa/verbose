import uuidv4 from 'uuid/v4'
import gql from 'graphql-tag'
import { GET_PAGE_ITEMS } from './components/Pages/Add/SortableList'
import { GET_BLOCK_ITEM } from './components/Pages/Add/Sections/Block'

export const resolvers = {
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

      const data = {
        pageItems: [...previousPageItems, newItem],
      }

      cache.writeQuery({ query: GET_PAGE_ITEMS, data })

      return data
    },
    updateBlockItem: (_root, variables, { cache }) => {
      const { name, value } = variables

      const previous = cache.readQuery({ query: GET_BLOCK_ITEM })

      const current = Object.assign(previous.blockItem, { [`${name}`]: value })
      console.log(current)
      const data = {
        blockItem: current,
      }
      cache.writeQuery({ query: GET_BLOCK_ITEM, data })
    },
  },
}
