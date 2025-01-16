import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
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
  create: async (collectionName: string, payload: { id: string; [key: string]: unknown }) => {
    const { id, ...rest } = payload;
    const data = { ...rest, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
    const docRef = doc(collection(db, collectionName), id);
    await setDoc(docRef, data);
    const docSnap = await getDoc(docRef);
    console.log({ payload, data, docRef, docSnap }, docRef.id);

    return convertFirestoreData(docSnap);
  },

  getAll: async (collectionName: string) => {
    const collectionRef = collection(db, collectionName);
    const docSnap = await getDocs(collectionRef);

    if (!docSnap.empty) {
      return docSnap.docs.map((doc) => convertFirestoreData(doc));
    }

    throw new Error('Id not found');
  },

  get: async (collectionName: string, id: string) => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return convertFirestoreData(docSnap);
    }

    throw new Error('Id not found');
  },

  update: async (
    collectionName: string,
    payload: { id: string; [key: string]: unknown }
  ): Promise<object> => {
    const { id, ...updateData } = payload;
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = await updateDoc(docRef, { ...updateData, updatedAt: serverTimestamp() });
      console.log(data);

      return payload;
    }

    throw new Error('Id not found');
  },

  delete: async (collectionName: string, id: string): Promise<boolean> => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    return true;
  },
};
