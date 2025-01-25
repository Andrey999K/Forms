export type ResponseField = {
  id: string;
  question: string;
  answer: string | string[];
};

export type FormResponse = {
  id: string;
  fields: ResponseField[];
  createdAt: number;
  updatedAt: number;
  formId: string;
};
