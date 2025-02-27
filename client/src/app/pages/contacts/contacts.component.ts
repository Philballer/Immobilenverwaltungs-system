import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AddButtonComponent } from '../../components/add-button/add-button.component';
import { DatatableComponent } from '../../components/datatable/datatable.component';
import { AddEditContactComponent } from '../../components/add-edit-contact/add-edit-contact.component';

import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from '../../services/contact-service/contact.service';
import { filter, Observable, Subscription, switchMap, EMPTY } from 'rxjs';
import { IContact } from '../../types/main-types';

type IData = { contact: IContact; isEdited: boolean; cancel: boolean };

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, AddButtonComponent, DatatableComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent implements OnInit {
  private readonly dialog = inject(MatDialog);

  private dialogSubscription: Subscription | undefined;

  public contacts$: Observable<IContact[]> | undefined;

  constructor(private _contactService: ContactService) {}

  public ngOnInit(): void {
    this.loadContacts();
  }

  public openAddDialogue(isEdit: boolean = false, editData?: IContact): void {
    const dialogRef = this.dialog.open(AddEditContactComponent, {
      height: '55%',
      minWidth: '50%',
      data: { contact: editData || {}, isEdit: isEdit },
    });

    this.dialogSubscription = dialogRef
      .afterClosed()
      .pipe(
        filter((data: IData) => !!data && !data.cancel), // Ignore if canceled
        switchMap((data: IData) => {
          if (data.contact && !isEdit) {
            return this._contactService.createContact(data.contact);
          }
          if (data.contact.id && isEdit) {
            return this._contactService.updateContact(
              data.contact,
              data.contact.id.toString()
            );
          }
          return EMPTY; // No request if no valid data
        })
      )
      .subscribe({
        next: () => this.loadContacts(),
        error: (err) => console.error('Error processing contact', err),
      });
  }

  public loadContacts(): void {
    this.contacts$ = this._contactService.getAllContacts();
  }

  public handleContactDelete(id: number): void {
    this._contactService.deleteOneContact(id.toString()).subscribe({
      next: () => this.loadContacts(),
      error: (err) => console.log('Error deleting contact', err),
    });
  }
  public handleContactEdit(id: number): void {
    this._contactService.getOneContact(id.toString()).subscribe((data) => {
      this.openAddDialogue(true, data);
    });
  }

  public ngOnDestroy(): void {
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
  }
}
