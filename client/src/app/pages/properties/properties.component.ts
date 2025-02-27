import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AddButtonComponent } from '../../components/add-button/add-button.component';
import { AddEditDialogueComponent } from '../../components/add-edit-dialogue/add-edit-dialogue.component';

import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { IProperty } from '../../types/main-types';
import { DatatableComponent } from '../../components/datatable/datatable.component';
import { PropertyService } from '../../services/property-service/property.service';
import { filter, Observable, Subscription, switchMap, EMPTY, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

type IData = { property: IProperty; isEdited: boolean; cancel: boolean };

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [AddButtonComponent, DatatableComponent, CommonModule],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss',
})
export class PropertiesComponent implements OnInit, OnDestroy {
  private readonly dialog = inject(MatDialog);

  private dialogSubscription: Subscription | undefined;

  public properties$: Observable<IProperty[]> | undefined;

  constructor(private _propertyService: PropertyService) {}

  public ngOnInit(): void {
    this.loadProperties();
  }

  public loadProperties(): void {
    this.properties$ = this._propertyService.getAllProperties();
  }

  public openAddDialogue(isEdit: boolean = false, editData?: IProperty): void {
    const dialogRef = this.dialog.open(AddEditDialogueComponent, {
      height: '52%',
      minWidth: '50%',
      data: { property: editData || {}, isEdit: isEdit },
    });

    this.dialogSubscription = dialogRef
      .afterClosed()
      .pipe(
        filter((data: IData) => !!data && !data.cancel), // Ignore if canceled

        switchMap((data) => {
          if (data.property && !isEdit) {
            return this._propertyService.createProperty(data.property);
          }
          if (data.property.id && isEdit) {
            return this._propertyService.updateProperty(
              data.property,
              data.property.id.toString()
            );
          }
          return EMPTY; // No request if no valid data
        })
      )
      .subscribe({
        next: () => this.loadProperties(),
        error: (err) => console.error('Error processing Prpoerty', err),
      });
  }

  public handlePropertyDelete(id: number): void {
    this._propertyService.deleteOneProperty(id.toString()).subscribe({
      next: () => this.loadProperties(),
      error: (err) => console.log('Error deleting property', err),
    });
  }

  public handlePropertyEdit(id: number): void {
    this._propertyService.getOneProperty(id.toString()).subscribe((data) => {
      this.openAddDialogue(true, data);
    });
  }

  public ngOnDestroy(): void {
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
  }
}
