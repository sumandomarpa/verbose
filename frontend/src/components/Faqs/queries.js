import gql from 'graphql-tag'

export const GET_FAQ = gql`
    {
        faq @client {
            id
            title
            description
            short_description
            vertical
            slug
            order
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
            slug
            order
        }
    }
`