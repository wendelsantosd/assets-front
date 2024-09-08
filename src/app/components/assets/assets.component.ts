import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../services/assets.service';
import { IAsset } from '../../interfaces/Asset';
import { CommonModule } from '@angular/common';
import { AssetComponent } from '../asset/asset.component';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { ButtonComponent } from '../button/button.component';

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

  constructor(private readonly assetsService: AssetsService) {}

  isOpenModal: boolean = false;

  ngOnInit(): void {
    this.assetsService.getAssets().subscribe((data) => {
      this.assets = data;
      this.calculate(this.assets);
    });
  }

  createAsset(asset: IAsset): void {
    this.assetsService.createAsset(asset).subscribe((asset) => {
      this.assets.push(asset);
      this.calculate(this.assets);
    });
  }

  updateAsset(asset: IAsset): void {
    this.assetsService.updateAsset(asset).subscribe((asset) => {
      const index = this.assets.findIndex((a) => a.id === asset.id);
      if (index >= 0) {
        this.assets[index] = asset;
      }
      this.calculate(this.assets);
    });
  }

  deleteAsset(asset: IAsset): void {
    this.assetsService.deleteAsset(asset).subscribe((asset) => {
      this.assets = this.assets.filter((a) => a.id !== asset.id);
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
