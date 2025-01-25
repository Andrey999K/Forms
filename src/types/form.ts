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
  // for RADIO and CHECKBOX
  options?: {
    id: string;
    label: string;
  }[];
};

type Form = {
  title: string;
  description: string;
  settings: { timer: string; timerActive: false };
  fields: ConstructorField[];
};

export type StoreDates = {
  createdAt: number;
  updatedAt: number;
};

export type FormData = { id: string } & Form & StoreDates;

export type ConstructorForm = { id: string } & Form & Partial<StoreDates>;

// --- CONSTANTS ---

export const FIELD_EXISTS = 'exists';

export const NEW_FORM: Form = {
  fields: [],
  title: 'Название формы',
  description: 'Описание формы',
  settings: { timer: '', timerActive: false },
};

export const BASE_AVATAR_URL = 'https://api.dicebear.com/6.x/avataaars/svg';
