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
      media {
        id
        url
      }
    }
  }
`

export const GET_BLOCK = gql`
  query GetBlock($itemId: String) {
    block(itemId: $itemId) @client {
      id
      title
      content
      video
      image
      style
      media {
        id
        url
      }
    }
  }
`

export const GET_BOXES = gql`
  query GetBoxes {
    boxes @client {
      id
      title
      image
      video
      style
      content
      media {
        id
        url
      }
    }
  }
`

export const GET_BOX = gql`
  query GetBox($itemId: String) {
    box(itemId: $itemId) @client {
      id
      title
      content
      video
      image
      style
      media {
        id
        url
      }
    }
  }
`

export const GET_PROS_AND_CONS = gql`
  query GetProsAndCons {
    prosAndCons @client {
      id
      title
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
`

export const GET_PROS_AND_CONS_BY_ID = gql`
  query GetProsAndConsById($itemId: String) {
    prosAndConsById(itemId: $itemId) @client {
      id
      title
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
`

export const GET_PAGES_DB = gql`
  query getPages {
    pages {
      id
      title
      image
      slug
      type
      vertical
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
        order
        media {
          id
          url
        }
      }
      boxes {
        id
        title
        image
        video
        style
        content
        order
        media {
          id
          url
        }
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
