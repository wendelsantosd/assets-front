import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../services/assets.service';
import { IAsset } from '../../interfaces/Asset';
import { CommonModule } from '@angular/common';
import { AssetComponent } from '../asset/asset.component';
import { CreateAssetComponent } from '../create-asset/create-asset.component';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [CommonModule, AssetComponent, CreateAssetComponent],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.css',
})
export class AssetsComponent implements OnInit {
  assets: IAsset[] = [];

  constructor(private readonly assetsService: AssetsService) {}

  ngOnInit(): void {
    this.assetsService.getAssets().subscribe((data) => {
      this.assets = data;
    });
  }

  createAsset(asset: IAsset): void {
    this.assetsService.createAsset(asset).subscribe((asset) => {
      this.assets.push(asset);
    });
  }

  deleteAsset(asset: IAsset): void {
    this.assetsService
      .deleteAsset(asset)
      .subscribe(
        () => (this.assets = this.assets.filter((a) => a.id !== asset.id))
      );
  }
}
