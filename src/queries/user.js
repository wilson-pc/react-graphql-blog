import { gql } from '@apollo/client';
export const GET_PROFILE = gql`
  # Increments a back-end counter and gets its resulting value
  query Profile {
    profile {
      id
      image
      email
      name
    }
  }
`;
