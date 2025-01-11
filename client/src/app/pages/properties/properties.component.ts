import { Component, inject } from '@angular/core';
import { AddButtonComponent } from '../../components/add-button/add-button.component';
import { AddEditDialogueComponent } from '../../components/add-edit-dialogue/add-edit-dialogue.component';

import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { IProperty } from '../../types/main-types';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [AddButtonComponent],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss',
})
export class PropertiesComponent {
  private readonly dialog = inject(MatDialog);

  public openAddDialogue(): void {
    console.log('Dialogue opened');
    const dialogRef = this.dialog.open(AddEditDialogueComponent, {
      height: '60%',
      minWidth: '50%',
    });

    dialogRef.afterClosed().subscribe((data: IProperty) => {
      console.log('result', data);

      console.log('Dialogue closed');
    });
  }
}
