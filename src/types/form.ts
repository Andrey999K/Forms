export enum FieldTypes {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
}

export type FieldType = (typeof FieldTypes)[keyof typeof FieldTypes];

export type RadioOption = {
  id: string;
  label: string;
};

export type ConstructorField = {
  id: string;
  type: FieldType;
  require: boolean;
  question: string;
  // for RADIO and CHECKBOX
  options?: RadioOption[];
};

export type Tag = {
  id: string;
  label: string;
  color: string;
};

type Form = {
  title: string;
  description: string;
  tags: Tag[];
  timer: string;
  fields: ConstructorField[];
  userId: string;
};

export type StoreDates = {
  createdAt: number;
  updatedAt: number;
};

export type FormData = { id: string } & Form & StoreDates;

export type ConstructorForm = { id: string } & Form & Partial<StoreDates>;

// --- CONSTANTS ---

export const FIELD_EXISTS = 'exists';

export const NEW_FORM: Omit<Form, 'userId'> = {
  fields: [],
  title: 'Название формы',
  description: 'Описание формы',
  timer: '',
  tags: [],
};

export const BASE_AVATAR_URL = 'https://api.dicebear.com/6.x/avataaars/svg';
