import { Component, inject, OnInit } from '@angular/core';
import { AddButtonComponent } from '../../components/add-button/add-button.component';
import { AddEditDialogueComponent } from '../../components/add-edit-dialogue/add-edit-dialogue.component';

import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { IProperty } from '../../types/main-types';
import { DatatableComponent } from '../../components/datatable/datatable.component';
import { PropertyService } from '../../services/property-service/property.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [AddButtonComponent, DatatableComponent, CommonModule],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss',
})
export class PropertiesComponent implements OnInit {
  private readonly dialog = inject(MatDialog);

  public properties$?: Observable<IProperty[]>;

  constructor(private _propertyService: PropertyService) {}

  public ngOnInit(): void {
    this.properties$ = this._propertyService.getAllProperties();
  }

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
