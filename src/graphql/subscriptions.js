import { gql } from "@apollo/client";

export const GET_SONGS = gql`
  {
    songs(order_by: { created_at: desc }) {
      aritst
      duration
      id
      thumbnail
      title
      url
    }
  }
`;
