import { Component, OnInit } from '@angular/core';
import { DropdownSelectComponent } from '../../components/dropdown-select/dropdown-select.component';
import { ContactService } from '../../services/contact-service/contact.service';
import { Subscription } from 'rxjs';
import {
  ContractType,
  IContact,
  IProperty,
  IRelationship,
  ServiceType,
} from '../../types/main-types';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../services/property-service/property.service';
import {
  DatePickerComponent,
  IDateRange,
} from '../../components/date-picker/date-picker.component';
import { ErrorMessageFormComponent } from '../../components/error-message-form/error-message-form.component';
import { AddButtonComponent } from '../../components/add-button/add-button.component';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: 'app-relationships',
  standalone: true,
  imports: [
    DropdownSelectComponent,
    CommonModule,
    DatePickerComponent,
    ErrorMessageFormComponent,
    AddButtonComponent,
  ],
  templateUrl: './relationships.component.html',
  styleUrl: './relationships.component.scss',
})
export class RelationshipsComponent implements OnInit {
  public contacts$: Subscription | undefined;

  public property$: Subscription | undefined;

  public contacts: IContact[] = [];

  public activeContact: IContact | undefined;

  public properties: IProperty[] = [];

  public showServices: boolean = false;

  public disableDateRange: boolean = false;

  public roles: ContractType[] = [
    ContractType.LANDLORD,
    ContractType.TENANT,
    ContractType.SERVICE,
  ];

  public services: ServiceType[] = [
    ServiceType.ELECTRICIAN,
    ServiceType.HANDYMAN,
    ServiceType.PAINTER,
    ServiceType.PLUMBER,
  ];

  public relationshipForm: IRelationship = {
    personId: '',
    propertyId: '',
    startDate: '',
    endDate: '',
  };

  constructor(
    private _contactService: ContactService,
    private _propertyService: PropertyService
  ) {}

  public ngOnInit(): void {
    this.contacts$ = this._contactService.getAllContacts().subscribe((data) => {
      this.contacts = data;
    });

    this.property$ = this._propertyService
      .getAllProperties()
      .subscribe((data) => {
        this.properties = data;
      });
  }

  public getContactNames(contacts: IContact[]): string[] {
    return contacts.map((contact) => contact.name);
  }

  public getPropertyAdresses(properties: IProperty[]): string[] {
    return properties.map((property) => property.address);
  }

  public handleRoleSelected(isService: { name: string; value: boolean }): void {
    if (isService.name === ContractType.SERVICE && isService.value) {
      this.showServices = true;
      this.relationshipForm.contract = ContractType.SERVICE;
    } else {
      this.showServices = false;
      this.relationshipForm.contract = isService.name;
    }

    if (isService.name === ContractType.LANDLORD) {
      this.disableDateRange = true;
    } else {
      this.disableDateRange = false;
    }
  }

  public handleServiceSelected(service: string): void {
    if (service) this.relationshipForm.service = service;
  }

  public handleDateRangePicked(range: IDateRange): void {
    this.relationshipForm.startDate = range.startDate;
    this.relationshipForm.endDate = range.endDate;
  }

  public handleContactPicked(index: number): void {
    this.activeContact = this.contacts[index];
    const contactId = this.contacts[index].id?.toString();
    if (contactId) {
      this.relationshipForm.personId = contactId;
    }
  }

  public handlePropertyPicked(index: number): void {
    const propertyId = this.properties[index].id?.toString();
    console.log(propertyId);
    if (propertyId) {
      this.relationshipForm.propertyId = propertyId;
    }
  }

  public handleConfirmClick(): void {
    let contact = this.activeContact;
    const { personId, ...form } = this.relationshipForm;

    const relationship: IRelationship = {
      propertyId: form.propertyId,
      startDate: form.startDate,
      endDate: form.endDate,
      contract: form.contract,
      service: form.service,
    };

    if (
      contact &&
      contact.relatedProperties &&
      contact.relatedProperties.length > 0
    ) {
      contact.relatedProperties.push(relationship);
      if (contact.id) {
        this._contactService
          .updateContact(contact, contact.id?.toLocaleString())
          .subscribe();
      }
    } else {
      if (contact) {
        contact = { ...contact, relatedProperties: [relationship] };
        if (contact.id) {
          this._contactService
            .updateContact(contact, contact.id?.toLocaleString())
            .subscribe();
        }
      }
    }
  }
}
