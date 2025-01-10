import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../utils/firebase/firebaseConfig';

const convertTimestampToNumber = (timestamp: Timestamp | null | undefined | number): number => {
  if (typeof timestamp !== 'number') {
    return timestamp ? timestamp.toMillis() : Date.now();
  } else {
    return timestamp;
  }
};

const convertFirestoreData = (doc: DocumentSnapshot<DocumentData>) => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: convertTimestampToNumber(data?.createdAt),
    updatedAt: convertTimestampToNumber(data?.updatedAt),
  };
};

export const firestoreService = {
  create: async (collectionName: string, payload: object) => {
    const data = { ...payload, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
    const docRef = await addDoc(collection(db, collectionName), data);
    const docSnap = await getDoc(docRef);
    return convertFirestoreData(docSnap);
  },

  getAll: async (collectionName: string) => {
    const collectionRef = collection(db, collectionName);
    const docSnap = await getDocs(collectionRef);

    if (!docSnap.empty) {
      return docSnap.docs.map((doc) => convertFirestoreData(doc));
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
