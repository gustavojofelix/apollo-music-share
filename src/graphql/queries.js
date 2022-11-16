//import { gql } from "apollo-boost";
import { gql } from "@apollo/client";

export const GET_SONGS = gql`
  subscription getSongs {
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
