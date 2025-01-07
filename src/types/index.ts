import { FieldTypes, FieldType, ConstructorField, ConstructorForm } from './constructor';

export const FieldExists = 'exists';

export enum FieldTypes {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
}

export enum Sort {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type Slice = {
  offset: number;
  limit: number;
};

export type ConstructorField = {
  id: string;
  type: FieldType;
  require: boolean;
  question: string;
  // for 'radio'
  options?: {
    id: string;
    label: string;
  }[];
};

export type { FieldType, ConstructorField, ConstructorForm };
export { FieldTypes };
