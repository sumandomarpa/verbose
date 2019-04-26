import gql from 'graphql-tag'

export const UPDATE_FAQ = gql`
    mutation updateFaq($name: String, $value: String, $faqId: String) {
        updateFaq(name: $name, value: $value, faqId: $faqId) @client
    }
`

export const SAVE_FAQ_TO_DB = gql`
  mutation ADD_FAQ(
    $title: String!
    $slug: String!
    $description: String
    $short_description: String
    $vertical: String
    $order: Int
    $authors: [ID!]!
  ) {
    addFaq(
      title: $title
      slug: $slug
      description: $description
      short_description: $short_description
      vertical: $vertical
      order: $order
      authors: $authors
    ) {
      id
      title
      slug
      vertical
    }
  }
`

export const UPDATE_FAQ_TO_DB = gql`
  mutation UPDATE_FAQ(
    $title: String!
    $slug: String!
    $description: String
    $short_description: String
    $vertical: String
    $order: Int
    $authors: [ID!]!
  ) {
    updateFaq(
      title: $title
      slug: $slug
      description: $description
      short_description: $short_description
      vertical: $vertical
      order: $order
      authors: $authors
    ) {
      id
      title
      slug
      vertical
    }
  }
`