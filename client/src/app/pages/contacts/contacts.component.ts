import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AddButtonComponent } from '../../components/add-button/add-button.component';
import { DatatableComponent } from '../../components/datatable/datatable.component';
import { AddEditContactComponent } from '../../components/add-edit-contact/add-edit-contact.component';

import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from '../../services/contact-service/contact.service';
import { Observable, Subscription } from 'rxjs';
import { IContact } from '../../types/main-types';
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
      .subscribe(
        (data: { contact: IContact; isEdited: boolean; cancel: boolean }) => {
          if (data.cancel) return;

          if (data.contact && !isEdit) {
            this._contactService.createContact(data.contact).subscribe({
              next: () => {
                setTimeout(() => {
                  this.loadContacts();
                }, 200);
              },
              error: (err) => console.log('Error creating Contact', err),
            });
          }

          if (data.contact.id && isEdit) {
            this._contactService
              .updateContact(data.contact, data.contact.id?.toString())
              .subscribe({
                next: () => {
                  setTimeout(() => {
                    this.loadContacts();
                  }, 200);
                },
                error: (err) => console.log('Error Editing Contact', err),
              });
          }
        }
      );
  }

  public loadContacts(): void {
    this.contacts$ = this._contactService.getAllContacts();
  }

  public handleContactDelete(id: number): void {
    this._contactService.deleteOneContact(id.toString()).subscribe();
    setTimeout(() => {
      this.loadContacts();
    }, 500);
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
