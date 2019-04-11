import gql from 'graphql-tag'

export const GET_PAGE = gql`
  {
    page @client {
      id
      title
      image
      vertical
      type
      slug
    }
  }
`

export const GET_PAGE_ITEMS = gql`
  query GetPageItems {
    pageItems @client {
      itemId
      pageId
      type
    }
  }
`

export const GET_BLOCKS = gql`
  query GetBlocks {
    blocks @client {
      id
      title
      image
      video
      style
      content
    }
  }
`

export const GET_BLOCK = gql`
  query GetBlock($itemId: String) {
    block(itemId: $itemId) @client {
      title
      content
      video
      image
      style
    }
  }
`

export const GET_PAGE_DB = gql`
  query getPage($id: ID) {
    page(id: $id) {
      id
      title
      image
      slug
      type
      vertical
      blocks {
        id
        title
        image
        video
        style
        content
      }
    }
  }
`
