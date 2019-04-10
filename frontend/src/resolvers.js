import shortid from 'shortid'
import gql from 'graphql-tag'
import {
  GET_PAGE,
  GET_PAGE_ITEMS,
  GET_BLOCKS,
} from './components/Pages/queries'

export const resolvers = {
  Query: {
    pageItems: (_root, variables, { cache }) => {
      const { pageId } = variables
      const { pageItems } = cache.readQuery({ query: GET_PAGE_ITEMS })

      return pageItems.filter(item => item.pageId === pageId)
    },
    block: (_root, variables, { cache }) => {
      const { itemId } = variables

      const { blocks } = cache.readQuery({ query: GET_BLOCKS })

      const block = blocks.filter(item => item.id === itemId)[0]

      return block
    },
  },
  Mutation: {
    updatePage: (_root, variables, { cache }) => {
      const { name, value } = variables

      const { page } = cache.readQuery({ query: GET_PAGE })
      page[name] = value

      cache.writeQuery({ query: GET_PAGE, data: page })
    },
    orderPageItems: (_root, variables, { cache }) => {
      const { itemIds } = variables
      const { pageItems } = cache.readQuery({ query: GET_PAGE_ITEMS })

      const data = {
        pageItems: [],
      }

      itemIds.forEach(itemId => {
        pageItems.forEach(item => {
          if (item.itemId === itemId) data.pageItems.push(item)
        })
      })

      cache.writeQuery({ query: GET_PAGE_ITEMS, data })

      return data
    },
    addPageItem: (_root, variables, { cache }) => {
      const { type, pageId } = variables
      const { pageItems } = cache.readQuery({ query: GET_PAGE_ITEMS })

      const newPageItem = {
        type,
        itemId: shortid.generate(),
        pageId,
        __typename: 'PageItem',
      }

      let data = {
        pageItems: [...pageItems, newPageItem],
      }
      cache.writeQuery({ query: GET_PAGE_ITEMS, data })

      // blocks
      const { blocks } = cache.readQuery({ query: GET_BLOCKS })

      const newBlock = {
        id: newPageItem.itemId,
        title: '',
        content: '<p></p>',
        image: '',
        video: '',
        style: 'full-width',
        __typename: 'Block',
      }

      data = {
        blocks: [...blocks, newBlock],
      }

      cache.writeQuery({ query: GET_BLOCKS, data })
      return data
    },
    updateBlock: (_root, variables, { cache, getCacheKey }) => {
      const { name, value, itemId } = variables

      const id = getCacheKey({ __typename: 'Block', id: itemId })
      const fragment = gql`
        fragment updateBlock on Block {
          ${name}
        }
      `
      const previous = cache.readFragment({ fragment, id })

      const data = { ...previous, [`${name}`]: value }
      cache.writeData({ id, data })
    },
  },
}
