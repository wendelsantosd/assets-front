import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IAsset } from '../../interfaces/Asset';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-asset',
  standalone: true,
  imports: [FormsModule, ButtonComponent, CommonModule],
  templateUrl: './create-asset.component.html',
  styleUrl: './create-asset.component.css',
})
export class CreateAssetComponent {
  @Output() onCreateAsset = new EventEmitter<IAsset>();

  name: string = '';
  value: number = 0;
  date: string | Date | null = null;
  showForm: boolean = false;

  changeView(value: boolean): void {
    this.showForm = value;
  }

  onSubmit() {
    if (!this.name) {
      alert('Campo nome obrigatório');
      return;
    }

    const newAsset: IAsset = {
      name: this.name,
      value: this.value,
      date: this.date,
    };

    this.onCreateAsset.emit(newAsset);

    this.name = '';
    this.value = 0;
    this.date = null;
  }
}
