import {
  FieldExists,
  FieldTypes,
  FieldType,
  ConstructorField,
  ConstructorForm,
} from './constructor';

export enum Sort {
  ASC = 'asc',
  DESC = 'desc',
}

export type Slice = {
  offset: number;
  limit: number;
};

export type AuthFormValues = {
  name?: string;
  surname?: string;
  email: string;
  password: string;
  copyPassword?: string;
};
export type { FieldType, ConstructorField, ConstructorForm };
export { FieldExists, FieldTypes };
