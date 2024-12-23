export const FieldTypes = {
  INPUT: 'input',
  TEXTAREA: 'textarea',
  RADIO: 'radio',
  FORM_ELEMENT: 'form_element',
} as const;

export type FieldType = (typeof FieldTypes)[keyof typeof FieldTypes];

export interface ConstructorField {
  id: string;
  type: FieldType;
  require: boolean;
  question: string;
  // for RADIO
  options?: {
    id: string;
    label: string;
  }[];
}

export interface ConstructorForm {
  id: string;
  title: string;
  description: string;
  createdAt: number;
  fields: ConstructorField[];
}
