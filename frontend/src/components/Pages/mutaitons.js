import gql from 'graphql-tag'

export const UPDATE_PAGE = gql`
  mutation UpdatePage($name: String, $value: String) {
    updatePage(name: $name, value: $value) @client
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
