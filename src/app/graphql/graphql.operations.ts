import { gql } from 'apollo-angular';

export const GET_ASSETS = gql`
  query {
    assets {
      id
      name
      value
      date
    }
  }
`;

export const CREATE_ASSET = gql`
  mutation createAsset($data: CreateAssetDTO!) {
    createAsset(data: $data) {
      id
      name
      value
      date
    }
  }
`;

export const UPDATE_ASSET = gql`
  mutation updateAsset($data: UpdateAssetDTO!) {
    updateAsset(data: $data) {
      id
      name
      value
      date
    }
  }
`;

export const DELETE_ASSET = gql`
  mutation deleteAsset($id: ID!) {
    deleteAsset(id: $id)
  }
`;
