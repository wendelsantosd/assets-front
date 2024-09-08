import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IAsset } from '../../interfaces/Asset';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-form',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.css',
})
export class ModalFormComponent implements OnInit {
  @Input() selectedAsset!: IAsset;
  @Output() onCreateAsset = new EventEmitter<IAsset>();
  @Output() onUpdateAsset = new EventEmitter<IAsset>();
  @Output() onCloseModal = new EventEmitter<boolean>();

  name: string = '';
  value: number = 0;
  date: string | Date | null | undefined = undefined;

  ngOnInit(): void {
    if (this.selectedAsset) {
      this.name = this.selectedAsset.name;
      this.value = this.selectedAsset.value;
      this.date = this.selectedAsset.date;
    }
  }

  faTimes = faTimes;

  onSubmit() {
    if (!this.name) {
      alert('Campo nome obrigatório');
      return;
    }

    if (!this.selectedAsset?.id) {
      const newAsset: IAsset = {
        name: this.name,
        value: this.value,
        date: this.date,
      };

      this.onCreateAsset.emit(newAsset);
    } else {
      const updatedAsset: IAsset = {
        id: this.selectedAsset.id,
        name: this.name,
        value: this.value,
        date: this.date,
      };

      this.onUpdateAsset.emit(updatedAsset);
    }

    this.closeModal();
  }

  closeModal() {
    this.onCloseModal.emit(false);
    this.resetValues();
  }

  resetValues() {
    this.name = '';
    this.value = 0;
    this.date = null;
  }
}
