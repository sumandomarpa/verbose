import gql from 'graphql-tag'

export const GET_MEDIA_FILES = gql`
  query getMediaFiles {
    mediaFiles {
      id
      url
      title
      altText
    }
  }
`
