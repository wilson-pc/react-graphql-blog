import { gql } from '@apollo/client';
export const CREATE_POST = gql`
  # Increments a back-end counter and gets its resulting value
  mutation CreatePost($data: PostCreateInput!) {
    createPost(data: $data) {
      id
    }
  }
`;

export const UPDATE_POST = gql`
  # Increments a back-end counter and gets its resulting value
  mutation UpdatePost($data: PostUpdateInput!, $where: PostWhereUniqueInput!) {
    updatePost(data: $data, where: $where) {
      id
    }
  }
`;

export const DELETE_POST = gql`
  # Increments a back-end counter and gets its resulting value
  mutation UpdatePost($where: PostWhereUniqueInput!) {
    deletePost(where: $where) {
      id
    }
  }
`;
