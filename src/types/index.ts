import { FieldTypes, FieldType, ConstructorField, ConstructorForm } from './constructor';

export enum Sort {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type Slice = {
  offset: number;
  limit: number;
};

export type { FieldType, ConstructorField, ConstructorForm };
export { FieldTypes };
