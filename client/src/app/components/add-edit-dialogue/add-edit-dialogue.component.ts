import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatIconModule } from '@angular/material/icon';
import { IProperty } from '../../types/main-types';
import { CommonModule } from '@angular/common';
import { GoogleAutcompleteAddressSearchbarComponent } from '../google-autcomplete-address-searchbar/google-autcomplete-address-searchbar.component';
import { formatNumber } from '../../helpers/format-number';

@Component({
  selector: 'app-add-edit-dialogue',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatIconModule,
    GoogleAutcompleteAddressSearchbarComponent,
  ],
  templateUrl: './add-edit-dialogue.component.html',
  styleUrl: './add-edit-dialogue.component.scss',
})
export class AddEditDialogueComponent {
  public formData: IProperty = {
    description: '',
    address: '',
    value: '',
    sizeInSqm: '',
  };

  public isEdit: boolean = false;

  private readonly dialogRef = inject(MatDialogRef<AddEditDialogueComponent>);

  private readonly editData = inject(MAT_DIALOG_DATA);

  constructor() {
    const { property, isEdit } = this.editData;

    this.isEdit = isEdit;
    if (property) {
      this.formData = { ...property };
    }
  }

  public handleCancelClick(): void {
    this.dialogRef.close({
      cancel: true,
    });
  }

  public handSaveClick(): void {
    this.dialogRef.close({
      property: { ...this.formData, value: formatNumber(this.formData.value) },
      isEdited: this.isEdit,
    });
  }

  public handleAddressSelected(address: string): void {
    console.log('address clicked immo', address);
    this.formData.address = address;
  }
}
