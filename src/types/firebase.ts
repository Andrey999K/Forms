import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { Sort } from './base';

export type FormListReferenceOption = {
  id: string;
  collectionName: string;
  key: string;
};

export type FormListOptions = {
  limit?: number;
  page?: number;
  search?: {
    key: string;
    value: string;
  };
  sort?: Sort;
  lastVisible?: QueryDocumentSnapshot<DocumentData, DocumentData>;
  reference?: FormListReferenceOption;
};

export type FormListResponse<T> = {
  data: T;
  lastVisible?: QueryDocumentSnapshot<DocumentData, DocumentData>;
};
