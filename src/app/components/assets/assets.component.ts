import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { IAsset } from '../../interfaces/Asset';
import { CommonModule } from '@angular/common';
import { AssetComponent } from '../asset/asset.component';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { ButtonComponent } from '../button/button.component';
import {
  CREATE_ASSET,
  DELETE_ASSET,
  GET_ASSETS,
  UPDATE_ASSET,
} from '../../graphql/graphql.operations';
import {
  CreateAssetResponse,
  CreateAssetVariables,
  DeleteAssetResponse,
  DeleteAssetVariables,
  getAssetsResponse,
  UpdateAssetResponse,
  updateAssetVariables,
} from '../../graphql/graphql.types';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [CommonModule, AssetComponent, ModalFormComponent, ButtonComponent],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.css',
})
export class AssetsComponent implements OnInit {
  assets: IAsset[] = [];
  selectedAsset!: IAsset;
  total!: number;
  isOpenModal: boolean = false;

  constructor(private readonly apollo: Apollo) {}

  ngOnInit(): void {
    this.getAssets();
  }

  getAssets() {
    this.apollo
      .watchQuery<getAssetsResponse>({
        query: GET_ASSETS,
      })
      .valueChanges.subscribe((response) => {
        this.assets = response.data.assets;
        this.calculate(this.assets);
      });
  }

  createAsset(asset: IAsset): void {
    this.apollo
      .mutate<CreateAssetResponse, CreateAssetVariables>({
        mutation: CREATE_ASSET,
        variables: {
          data: {
            name: asset.name,
            value: asset.value,
            date: asset?.date,
          },
        },
      })
      .subscribe((response) => {
        const data = response.data?.createAsset;

        if (data) {
          const newAsset: IAsset = {
            id: data.id,
            name: data.name,
            value: data.value,
            date: data.date,
          };

          this.assets = [...this.assets, newAsset];

          this.calculate(this.assets);
        }
      });
  }

  updateAsset(asset: IAsset): void {
    this.apollo
      .mutate<UpdateAssetResponse, updateAssetVariables>({
        mutation: UPDATE_ASSET,
        variables: {
          data: {
            id: asset.id,
            name: asset.name,
            value: asset.value,
            date: asset.date,
          },
        },
      })
      .subscribe((response) => {
        const data = response.data?.updateAsset;

        if (data) {
          const updatedAsset: IAsset = {
            id: data.id,
            name: data.name,
            value: data.value,
            date: data.date,
          };

          this.assets = this.assets.map((a) =>
            a.id === updatedAsset.id ? updatedAsset : a
          );

          this.calculate(this.assets);
        }
      });
  }

  deleteAsset(asset: IAsset): void {
    this.apollo
      .mutate<DeleteAssetResponse, DeleteAssetVariables>({
        mutation: DELETE_ASSET,
        variables: {
          id: asset.id,
        },
      })
      .subscribe((response) => {
        const id = response.data?.deleteAsset;

        this.assets = this.assets.filter((a) => a.id !== id);

        this.calculate(this.assets);
      });
  }
  openModal(value: boolean): void {
    this.isOpenModal = value;

    if (!value) {
      this.selectedAsset = {
        id: '',
        name: '',
        value: 0,
        date: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }

  onSelectAsset(asset: IAsset): void {
    this.selectedAsset = asset;
    this.openModal(true);
  }

  calculate(assets: IAsset[]): void {
    this.total = assets.reduce((acc, asset) => {
      return acc + asset.value;
    }, 0);
  }
}
