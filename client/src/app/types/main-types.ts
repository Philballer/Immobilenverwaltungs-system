export type IProperty = {
  id?: number;
  description: string;
  address: string;
  value: string;
};

export type IContact = {
  id: number;
  name: string;
  number: string;
  role: ContractType;
};

export enum ContractType {
  LANDLORD,
  TENANT,
  SERVICE,
}
