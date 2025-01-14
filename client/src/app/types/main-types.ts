export type IProperty = {
  id?: number;
  description: string;
  address: string;
  sizeInSqm: string;
  value: string;
};

export type IContact = {
  name: string;
  number: string;
  address: string;
  id?: number;
  relatedProperties?: IRelationship[];
};

export type IRelationship = {
  propertyId: string;
  startDate: string;
  endDate: string;
  personId?: string;
  contract?: ContractType | string;
  service?: ServiceType | string;
};

export enum ContractType {
  LANDLORD = 'Eigentümer',
  TENANT = 'Mieter',
  SERVICE = 'Dienstleiter',
}

export enum ServiceType {
  PLUMBER = 'Installateur',
  HANDYMAN = 'Handwerker',
  ELECTRICIAN = 'Elektriker',
  PAINTER = 'Maler',
}
