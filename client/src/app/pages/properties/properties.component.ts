import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AddButtonComponent } from '../../components/add-button/add-button.component';
import { AddEditDialogueComponent } from '../../components/add-edit-dialogue/add-edit-dialogue.component';

import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { IProperty } from '../../types/main-types';
import { DatatableComponent } from '../../components/datatable/datatable.component';
import { PropertyService } from '../../services/property-service/property.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

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
      .subscribe(
        (data: { property: IProperty; isEdited: boolean; cancel: boolean }) => {
          if (data.cancel) return;

          if (data.property && !isEdit) {
            this._propertyService.createProperty(data.property).subscribe({
              next: () => {
                setTimeout(() => {
                  this.loadProperties();
                }, 200);
              },
              error: (err) => console.log('Error creating property', err),
            });
          }

          if (data.property.id && isEdit) {
            this._propertyService
              .updateProperty(data.property, data.property.id?.toString())
              .subscribe({
                next: () => {
                  setTimeout(() => {
                    this.loadProperties();
                  }, 200);
                },
                error: (err) => console.log('Error Editing property', err),
              });
          }
        }
      );
  }

  public handlePropertyDelete(id: number): void {
    this._propertyService.deleteOneProperty(id.toString()).subscribe();
    setTimeout(() => {
      this.loadProperties();
    }, 500);
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
