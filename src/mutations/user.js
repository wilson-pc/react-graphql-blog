import { gql } from '@apollo/client';
export const LOGIN_USER = gql`
  # Increments a back-end counter and gets its resulting value
  mutation Login($login: LoginInput!) {
    login(login: $login) {
      user {
        email
        sub
      }
      access_token
    }
  }
`;

export const REGISTER_USER = gql`
  # Increments a back-end counter and gets its resulting value
  mutation Register($data: UserCreateInput!) {
    createUser(data: $data) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  # Increments a back-end counter and gets its resulting value
  mutation Update($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateUser(data: $data, where: $where) {
      id
    }
  }
`;
