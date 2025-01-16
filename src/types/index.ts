import {
  FIELD_EXISTS,
  FieldTypes,
  FieldType,
  ConstructorField,
  ConstructorForm,
  FormData,
  NEW_FORM,
} from './form';

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

export type HandleChangeForm = { name: string; value: unknown };

export type { FieldType, ConstructorField, ConstructorForm, FormData };
export { FIELD_EXISTS, FieldTypes, NEW_FORM };
