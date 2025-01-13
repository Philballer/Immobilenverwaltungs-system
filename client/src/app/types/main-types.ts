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
  ownedProperties?: string[];
  id?: number;
  role?: ContractType;
};

export type IRelationship = {
  person: IContact;
  property: IProperty;
  contract: ContractType;
  startDate: string;
  endDate: string;
};

export enum ContractType {
  LANDLORD,
  TENANT,
  SERVICE,
}
