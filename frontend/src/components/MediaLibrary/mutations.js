import gql from 'graphql-tag'

export const UPLOAD_MEDIA = gql`
  mutation uploadMedia($media: Upload!) {
    uploadMedia(media: $media) {
      url
    }
  }
`
