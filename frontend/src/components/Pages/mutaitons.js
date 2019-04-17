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

export const UPDATE_BOX = gql`
  mutation UpdateBox($name: String, $value: String, $itemId: String) {
    updateBox(name: $name, value: $value, itemId: $itemId) @client
  }
`

export const UPDATE_PROS_AND_CONS = gql`
  mutation UpdateProsAndCons(
    $name: String
    $value: String
    $itemId: String
    $prosId: ID
    $consId: ID
  ) {
    updateProsAndCons(
      name: $name
      value: $value
      itemId: $itemId
      prosId: $prosId
      consId: $consId
    ) @client
  }
`

export const ADD_PROS_OR_CONS = gql`
  mutation AddProsOrCons($itemId: String, $prosOrCons: String) {
    addProsOrCons(itemId: $itemId, prosOrCons: $prosOrCons) @client
  }
`

export const REMOVE_PROS_OR_CONS = gql`
  mutation RemoveProsOrCons($itemId: String, $prosOrConsId: Id) {
    removeProsOrCons(itemId: $itemId, prosOrConsId: $prosOrConsId) @client
  }
`

export const ADD_PAGE_ITEM = gql`
  mutation AddPageItem($type: String!, $pageId: String!) {
    addPageItem(type: $type, pageId: $pageId) @client
  }
`

export const REMOVE_PAGE_ITEM = gql`
  mutation RemovePageItem($itemId: ID, $type: String) {
    removePageItem(itemId: $itemId, type: $type) @client
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
    $boxes: [BoxInput]
    $prosAndCons: [ProsAndConsInput]
  ) {
    addPage(
      title: $title
      slug: $slug
      type: $type
      vertical: $vertical
      blocks: $blocks
      boxes: $boxes
      prosAndCons: $prosAndCons
    ) {
      id
      title
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
        order
      }
      boxes {
        id
        title
        image
        video
        style
        content
        order
      }
    }
  }
`

export const UPDATE_PAGE_TO_DB = gql`
  mutation UPDATE_PAGE(
    $id: ID!
    $title: String!
    $slug: String!
    $type: PageType!
    $vertical: String
    $blocks: [BlockInput]
    $boxes: [BoxInput]
    $prosAndCons: [ProsAndConsInput]
  ) {
    updatePage(
      id: $id
      title: $title
      slug: $slug
      type: $type
      vertical: $vertical
      blocks: $blocks
      boxes: $boxes
      prosAndCons: $prosAndCons
    ) {
      id
      title
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
        order
      }
      boxes {
        id
        title
        image
        video
        style
        content
        order
      }
      prosAndCons {
        id
        title
        order
        pros {
          id
          content
        }
        cons {
          id
          content
        }
      }
    }
  }
`
