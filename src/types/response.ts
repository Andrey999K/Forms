export type ResponseField = {
  id: string;
  value: string | string[];
};

export type FormResponse = {
  id: string;
  formId: string;
  createdAt: number;
  updatedAt: number;
  fields: ResponseField[];
};
