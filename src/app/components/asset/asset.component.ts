import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IAsset } from '../../interfaces/Asset';
import { faTimes, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asset',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.css',
})
export class AssetComponent {
  @Input() asset!: IAsset;
  @Output() onDeleteAsset = new EventEmitter<IAsset>();
  @Output() onSelectAsset = new EventEmitter<IAsset>();

  faTimes = faTimes;
  faPen = faPen;

  onDelete(asset: IAsset) {
    this.onDeleteAsset.emit(asset);
  }

  onSelect(asset: IAsset) {
    this.onSelectAsset.emit(asset);
  }
}
