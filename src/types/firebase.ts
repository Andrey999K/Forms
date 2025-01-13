import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { Sort } from './base';
import { Card } from './card';

export type FormListOptions = {
  limit: number;
  page: number;
  search?: string;
  sort: Sort;
  lastVisible?: QueryDocumentSnapshot<DocumentData, DocumentData>;
};

export type FormListResponse = {
  data: Card[];
  lastVisible: QueryDocumentSnapshot<DocumentData, DocumentData>;
};
