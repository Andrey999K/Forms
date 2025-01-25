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
  settings: { timer: string; timerActive: false; tags: Tag[] };
  fields: ConstructorField[];
};

export type StoreDates = {
  createdAt: number;
  updatedAt: number;
};

export type FormData = { id: string } & Form & StoreDates;

export type ConstructorForm = { id: string } & Form & Partial<StoreDates>;

export type ConstructorError = { question?: string; options?: { [key: string]: string } };
export type ConstructorErrors = Record<string, ConstructorError>;

// --- CONSTANTS ---

export const FIELD_EXISTS = 'exists';

export const NEW_FORM: Form = {
  fields: [],
  title: 'Название формы',
  description: 'Описание формы',
  settings: { timer: '', timerActive: false, tags: [] },
};
