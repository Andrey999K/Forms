import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  serverTimestamp,
  startAfter,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '@/utils/firebase/firebaseConfig';
import { FormListOptions, FormListResponse } from '@/types';

const convertTimestampToNumber = (timestamp: Timestamp | null | undefined | number): number => {
  if (typeof timestamp !== 'number') {
    return timestamp ? timestamp.toMillis() : Date.now();
  } else {
    return timestamp;
  }
};

const convertFirestoreData = <T>(doc: DocumentSnapshot<DocumentData>) => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: convertTimestampToNumber(data?.createdAt),
    updatedAt: convertTimestampToNumber(data?.updatedAt),
  } as T;
};

export const firestoreService = {
  create: async (collectionName: string, payload: object) => {
    const data = { ...payload, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
    const docRef = await addDoc(collection(db, collectionName), data);
    const docSnap = await getDoc(docRef);
    return convertFirestoreData(docSnap);
  },

  getAll: async (collectionName: string, options: FormListOptions): Promise<FormListResponse> => {
    const collectionRef = collection(db, collectionName);

    const constrains: QueryConstraint[] = [
      orderBy('updatedAt', options.sort),
      limit(options.limit),
    ];

    if (options.lastVisible) {
      constrains.push(startAfter(options.lastVisible));
    }

    if (options.search?.length) {
      constrains.push(where('title', '==', options.search));
    }

    const q = query(collectionRef, ...constrains);

    const docSnap = await getDocs(q);

    if (!docSnap.empty) {
      return {
        data: docSnap.docs.map((doc) => convertFirestoreData(doc)),
        lastVisible: docSnap.docs[docSnap.docs.length - 1],
      };
    }

    throw new Error('Not found');
  },

  get: async (collectionName: string, id: string) => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return convertFirestoreData(docSnap);
    }

    throw new Error('Not found');
  },

  update: async (
    collectionName: string,
    payload: { id: string; [key: string]: unknown }
  ): Promise<object> => {
    const { id, ...updateData } = payload;
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, { ...updateData, updatedAt: serverTimestamp() });
      return payload;
    }

    throw new Error('Not found');
  },

  delete: async (collectionName: string, id: string): Promise<boolean> => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    return true;
  },
};
