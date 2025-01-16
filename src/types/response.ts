import { DocumentData, DocumentReference } from 'firebase/firestore';

export type ResponseField = {
  id: string;
  question: string;
  answer: string;
};

export type FormResponse = {
  id: string;
  fields: {
    id: string;
    question: string;
    answer: string;
  }[];
  formId: string;
  createdAt: number;
};

export type FormResponseRequest = {
  formId: DocumentReference<DocumentData, DocumentData>;
  fields: ResponseField[];
};
