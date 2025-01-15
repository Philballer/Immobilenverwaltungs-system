import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { ContactService } from '../../services/contact-service/contact.service';
import { IContact, IProperty, IRelationship } from '../../types/main-types';
import { DatatableComponent } from '../../components/datatable/datatable.component';
import { PropertyService } from '../../services/property-service/property.service';
import { forkJoin } from 'rxjs';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [CommonModule, DatatableComponent, SpinnerComponent],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss',
})
export class ContactDetailsComponent implements OnInit {
  public contact: IContact = {
    name: '',
    number: '',
    address: '',
    relatedProperties: [],
  };

  public properties: IProperty[] = [];
  public loading = true;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private _contactService: ContactService,
    private _propertyService: PropertyService
  ) {}

  public ngOnInit(): void {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId) {
      this._contactService.getOneContact(contactId).subscribe((data) => {
        this.contact = data;
        const propertyIds =
          data.relatedProperties?.map((property) => property.propertyId) || [];

        if (propertyIds.length > 0) {
          const propertyRequests = propertyIds.map((id) =>
            this._propertyService.getOneProperty(id)
          );

          forkJoin(propertyRequests).subscribe((propertiesData) => {
            this.properties = propertiesData;
            this.loading = false;
          });
        } else {
          this.loading = false;
        }
      });
    }
  }

  public onGoBackClick(): void {
    this.location.back();
  }
}
