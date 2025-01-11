import { Component, inject, model } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IProperty } from '../../types/main-types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-dialogue',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatIconModule,
    MatDialogClose,
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

  private readonly dialogRef = inject(MatDialogRef<AddEditDialogueComponent>);

  public readonly data = model(this.formData);

  public handleCancelClick(): void {
    this.dialogRef.close();
  }

  public handSaveClick(): void {
    this.dialogRef.close(this.data());
  }
}
