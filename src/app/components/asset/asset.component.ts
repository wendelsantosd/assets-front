import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IAsset } from '../../interfaces/Asset';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
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

  faTimes = faTimes;

  onDelete(asset: IAsset) {
    this.onDeleteAsset.emit(asset);
  }
}
