import gql from 'graphql-tag'

export const SAVE_FAQ_TO_DB = gql`
  mutation ADD_FAQ(
    $title: String!
    $slug: String!
    $description: String
    $short_description: String
    $vertical: String
    $order: Int
    $authors: [ID!]!
    $category: [ID!]
    $variant: [String]
  ) {
    addFaq(
      title: $title
      slug: $slug
      description: $description
      short_description: $short_description
      vertical: $vertical
      order: $order
      authors: $authors
      category: $category
      variant: $variant
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
    $id: ID!
    $title: String!
    $slug: String!
    $description: String
    $short_description: String
    $vertical: String
    $order: Int
    $authors: [ID!]!
    $category: [ID!]
    $variant: [String]
  ) {
    updateFaq(
      id: $id
      title: $title
      slug: $slug
      description: $description
      short_description: $short_description
      vertical: $vertical
      order: $order
      authors: $authors
      category: $category
      variant: $variant
    ) {
      id
      title
      slug
      vertical
    }
  }
`