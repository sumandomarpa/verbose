import gql from 'graphql-tag'

export const UPDATE_PAGE = gql`
  mutation UpdatePage($name: String, $value: String, $pageId: String) {
    updatePage(name: $name, value: $value, pageId: $pageId) @client
  }
`

export const UPDATE_BLOCK = gql`
  mutation UpdateBlock($name: String, $value: String, $itemId: String) {
    updateBlock(name: $name, value: $value, itemId: $itemId) @client
  }
`

export const ADD_PAGE_ITEM = gql`
  mutation AddPageItem($type: String!, $pageId: String!) {
    addPageItem(type: $type, pageId: $pageId) @client
  }
`

export const ORDER_PAGE_ITEMS = gql`
  mutation OrderPageItems($itemIds: [String]!) {
    orderPageItems(itemIds: $itemIds) @client
  }
`

export const SAVE_PAGE_TO_DB = gql`
  mutation ADD_PAGE(
    $title: String!
    $slug: String!
    $type: PageType!
    $vertical: String
    $blocks: [BlockInput]
  ) {
    addPage(
      title: $title
      slug: $slug
      type: $type
      vertical: $vertical
      blocks: $blocks
    ) {
      id
      title
      slug
      type
      vertical
      blocks {
        id
        title
      }
    }
  }
`
