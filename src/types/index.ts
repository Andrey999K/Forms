import {
  FIELD_EXISTS,
  FieldTypes,
  FieldType,
  ConstructorField,
  ConstructorForm,
} from './constructor';

export enum Sort {
  ASC = 'ASC',
  DESC = 'DESC',
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
export { FIELD_EXISTS, FieldTypes };
