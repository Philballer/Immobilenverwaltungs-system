import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { RelationshipsComponent } from './pages/relationships/relationships.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'properties', component: PropertiesComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'relations', component: RelationshipsComponent },
];
