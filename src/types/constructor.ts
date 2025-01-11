export const FieldExists = 'exists';

export enum FieldTypes {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
}

export type FieldType = (typeof FieldTypes)[keyof typeof FieldTypes];

export type ConstructorField = {
  id: string;
  type: FieldType;
  require: boolean;
  question: string;
  // for RADIO
  options?: {
    id: string;
    label: string;
  }[];
};

export type ConstructorForm = {
  id: string;
  title: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  fields: ConstructorField[];
};
