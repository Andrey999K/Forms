import { DocumentData, QueryDocumentSnapshot, WhereFilterOp } from 'firebase/firestore';
import { Sort } from './base';

export type FormListReferenceOption = {
  id: string;
  collectionName: string;
  key: string;
};

export type FormListOptions = {
  limit?: number;
  search?: {
    key: string;
    value: string;
  };
  filters?: {
    key: string;
    value: string | Date;
    operator: WhereFilterOp;
  }[];
  sort?: Sort;
  lastVisible?: QueryDocumentSnapshot<DocumentData, DocumentData>;
  reference?: FormListReferenceOption;
};

export type FormListResponse<T> = {
  data: T;
  lastVisible?: QueryDocumentSnapshot<DocumentData, DocumentData>;
};
