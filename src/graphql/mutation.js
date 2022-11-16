import { gql } from "@apollo/client";

export const ADD_SONG = gql`
  mutation addSong(
    $artist: String!
    $title: String!
    $thumbnail: String!
    $duration: Float!
    $url: String!
  ) {
    insert_songs(
      objects: {
        url: $url
        title: $title
        thumbnail: $thumbnail
        duration: $duration
        aritst: $artist
      }
    ) {
      affected_rows
    }
  }
`;
