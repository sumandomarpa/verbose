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

export const UPDATE_BLOCK_MEDIA = gql`
  mutation UpdateBlockMedia($media: Media, $itemId: String) {
    updateBlockMedia(media: $media, itemId: $itemId) @client
  }
`

export const UPDATE_BOX = gql`
  mutation UpdateBox($name: String, $value: String, $itemId: String) {
    updateBox(name: $name, value: $value, itemId: $itemId) @client
  }
`

export const UPDATE_BOX_MEDIA = gql`
  mutation UpdateBoxMedia($media: Media, $itemId: String) {
    updateBoxMedia(media: $media, itemId: $itemId) @client
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
  mutation AddPageItem($type: String!) {
    addPageItem(type: $type) @client
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

export const REPLACE_PAGE_ITEMS_ID = gql`
  mutation ReplacePageItemsId($itemId: String!, $newItemId: String!) {
    replacePageItemsId(itemId: $itemId, newItemId: $newItemId) @client
  }
`

export const UPSERT_PAGE_TO_DB = gql`
  mutation UPSERT_PAGE(
    $id: ID!
    $title: String!
    $slug: String!
    $type: PageType!
    $vertical: String
  ) {
    upsertPage(
      id: $id
      title: $title
      slug: $slug
      type: $type
      vertical: $vertical
    ) {
      id
      title
      slug
      type
      vertical
    }
  }
`

export const UPSERT_BLOCK_TO_DB = gql`
  mutation UPSERT_BLOCK(
    $id: ID!
    $page: ID!
    $media: ID
    $title: String!
    $image: String
    $video: String
    $style: String
    $content: String
    $order: Int
  ) {
    upsertBlock(
      id: $id
      page: $page
      media: $media
      title: $title
      image: $image
      video: $video
      style: $style
      content: $content
      order: $order
    ) {
      id
      title
      image
      video
      style
      content
      order
    }
  }
`

export const DELETE_BLOCK_TO_DB = gql`
  mutation DELETE_BLOCK($id: ID!) {
    deleteBlock(id: $id) {
      id
    }
  }
`

export const UPSERT_BOX_TO_DB = gql`
  mutation UPSERT_BOX(
    $id: ID!
    $page: ID!
    $media: ID
    $title: String!
    $image: String
    $video: String
    $style: String
    $content: String
    $order: Int
  ) {
    upsertBox(
      id: $id
      page: $page
      media: $media
      title: $title
      image: $image
      video: $video
      style: $style
      content: $content
      order: $order
    ) {
      id
      title
      image
      video
      style
      content
      order
    }
  }
`

export const DELETE_BOX_TO_DB = gql`
  mutation DELETE_BOX($id: ID!) {
    deleteBox(id: $id) {
      id
    }
  }
`

export const UPSERT_PROS_AND_CONS_TO_DB = gql`
  mutation UPSERT_PROS_AND_CONS(
    $id: ID!
    $page: ID!
    $title: String
    $pros: [ProConInput]
    $cons: [ProConInput]
    $order: Int
  ) {
    upsertProsAndCons(
      id: $id
      page: $page
      title: $title
      pros: $pros
      cons: $cons
      order: $order
    ) {
      id
      title
      order
    }
  }
`

export const DELETE_PROS_AND_CONS_TO_DB = gql`
  mutation DELETE_PROS_AND_CONS($id: ID!) {
    deleteProsAndCons(id: $id) {
      id
    }
  }
`

export const UPDATE_SECTIONS_ORDER_TO_DB = gql`
  mutation UPDATE_SECTIONS_ORDER($sectionsOrder: [SectionsOrder]!) {
    updateSectionsOrder(sectionsOrder: $sectionsOrder) {
      id
    }
  }
`
