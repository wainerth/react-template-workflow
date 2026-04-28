import { gql } from '@apollo/client';


export const MARK_VIDEO_AS_SEEN = gql`
mutation VideoVisto($userId: ID!, $videoId: ID!) {
  VideoVisto(userId: $userId, videoId: $videoId) {
    success
    message
  }
}
`