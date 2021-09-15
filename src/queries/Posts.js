import { gql } from '@apollo/client';
export const GET_POSTS = gql`
  # Increments a back-end counter and gets its resulting value
  query Posts($where: PostWhereInput) {
    posts(where: $where, orderBy: { createdAt: desc }) {
      id
      content
      title
      image
      author {
        id
        email
      }
    }
  }
`;

export const GET_My_POSTS = gql`
  # Increments a back-end counter and gets its resulting value
  query Profile {
    profile {
      id
      posts {
        id
        content
        image
        title
      }
    }
  }
`;

export const GET_POST = gql`
  # Increments a back-end counter and gets its resulting value
  query Post($where: PostWhereInput) {
    post(where: $where) {
      id
      content
      title
      image
      published
    }
  }
`;
