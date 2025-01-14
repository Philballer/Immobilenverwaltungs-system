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
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IContact } from '../../types/main-types';
import { CommonModule } from '@angular/common';
import { formatToGermanMobileNumber } from '../../helpers/format-number';
import { GoogleAutcompleteAddressSearchbarComponent } from '../google-autcomplete-address-searchbar/google-autcomplete-address-searchbar.component';

@Component({
  selector: 'app-add-edit-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatIconModule,
    GoogleAutcompleteAddressSearchbarComponent,
  ],
  templateUrl: './add-edit-contact.component.html',
  styleUrl: './add-edit-contact.component.scss',
})
export class AddEditContactComponent {
  public formData: IContact = {
    name: '',
    number: '',
    address: '',
  };

  public isEdit: boolean = false;

  private readonly dialogRef = inject(MatDialogRef<AddEditContactComponent>);

  private readonly editData = inject(MAT_DIALOG_DATA);

  constructor() {
    const { contact, isEdit } = this.editData;

    this.isEdit = isEdit;
    if (contact) {
      this.formData = { ...contact };
    }
  }

  public handleCancelClick(): void {
    this.dialogRef.close({
      cancel: true,
    });
  }

  public handleSaveClick(): void {
    this.dialogRef.close({
      contact: {
        ...this.formData,
        number: formatToGermanMobileNumber(this.formData.number),
      },
      isEdited: this.isEdit,
    });
  }

  public handleAddressChange(address: string): void {
    console.log('address clicked kont', address);

    this.formData.address = address;
  }
}
