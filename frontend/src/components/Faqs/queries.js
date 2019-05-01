import gql from 'graphql-tag'

export const CURRENT_USER = gql`
  query {
    me @client {
      id
    }
  }
`

export const GET_FAQ_DB = gql`
    query getFaq($id: ID) {
        faq(id: $id) {
            id
            title
            description
            short_description
            vertical
            authors {
                id
            }
            slug
            order
        }
    }
`