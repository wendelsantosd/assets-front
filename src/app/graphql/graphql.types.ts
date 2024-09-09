import { IAsset } from '../interfaces/Asset';

export interface getAssetsResponse {
  assets: IAsset[];
}

export interface CreateAssetResponse {
  createAsset: IAsset;
}

export interface CreateAssetVariables {
  data: IAsset;
}

export interface UpdateAssetResponse {
  updateAsset: IAsset;
}

export interface updateAssetVariables {
  data: IAsset;
}

export interface DeleteAssetResponse {
  deleteAsset: string;
}

export interface DeleteAssetVariables {
  id?: string;
}
