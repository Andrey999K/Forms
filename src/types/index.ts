import {
  FIELD_EXISTS,
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

export type SignUpFormValues = {
  name: string;
  surname: string;
  email: string;
  password: string;
  copyPassword: string;
};

export type SignInFormValues = {
  email: string;
  password: string;
};

export type AuthUser = {
  uid: string;
  email: string | null;
};

export type { FieldType, ConstructorField, ConstructorForm };
export { FIELD_EXISTS, FieldTypes };
