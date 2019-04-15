import shortid from 'shortid'
import gql from 'graphql-tag'
import remove from 'lodash/remove'

import {
  GET_PAGE_ITEMS,
  GET_BLOCKS,
  GET_BOXES,
} from './components/Pages/queries'

export const resolvers = {
  Query: {
    pageItems: (_root, variables, { cache }) => {
      const { pageItems } = cache.readQuery({ query: GET_PAGE_ITEMS })
      return pageItems
    },
    block: (_root, variables, { cache }) => {
      const { itemId } = variables
      const { blocks } = cache.readQuery({ query: GET_BLOCKS })
      const block = blocks.filter(item => item.id === itemId)[0]
      return block
    },
    box: (_root, variables, { cache }) => {
      const { itemId } = variables

      const { boxes } = cache.readQuery({ query: GET_BOXES })
      const box = boxes.filter(item => item.id === itemId)[0]

      return box
    },
  },
  Mutation: {
    updatePage: (_root, variables, { cache, getCacheKey }) => {
      const { name, value, pageId } = variables

      const id = getCacheKey({ __typename: 'Page', id: pageId })
      const fragment = gql`
        fragment updatePage on Page {
          ${name}
        }
      `
      const previous = cache.readFragment({ fragment, id })

      const data = { ...previous, [`${name}`]: value }
      cache.writeData({ id, data })
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
      if (type === 'block') {
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
      } else if (type === 'box') {
        const { boxes } = cache.readQuery({ query: GET_BOXES })
        const newBox = {
          id: newPageItem.itemId,
          title: '',
          content: '<p></p>',
          image: '',
          video: '',
          style: 'white',
          __typename: 'Box',
        }
        data = {
          boxes: [...boxes, newBox],
        }
        cache.writeQuery({ query: GET_BOXES, data })
      }

      return data
    },
    removePageItem: (_root, variables, { cache }) => {
      const { itemId, type } = variables

      const { pageItems } = cache.readQuery({ query: GET_PAGE_ITEMS })
      remove(pageItems, pageItem => pageItem.itemId === itemId)

      let data = {
        pageItems,
      }

      cache.writeQuery({ query: GET_PAGE_ITEMS, data })

      if (type === 'block') {
        const { blocks } = cache.readQuery({ query: GET_BLOCKS })
        remove(blocks, block => block.id === itemId)
        data = {
          blocks,
        }
        cache.writeQuery({ query: GET_BLOCKS, data })
      } else if (type === 'box') {
        const { boxes } = cache.readQuery({ query: GET_BOXES })
        remove(boxes, box => box.id === itemId)
        data = {
          boxes,
        }
        cache.writeQuery({ query: GET_BLOCKS, data })
      }

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
    updateBox: (_root, variables, { cache, getCacheKey }) => {
      const { name, value, itemId } = variables

      const id = getCacheKey({ __typename: 'Box', id: itemId })
      const fragment = gql`
        fragment updateBox on Box {
          ${name}
        }
      `
      const previous = cache.readFragment({ fragment, id })

      const data = { ...previous, [`${name}`]: value }
      cache.writeData({ id, data })
    },
  },
}
