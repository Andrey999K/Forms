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
  setDoc,
  startAfter,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { db, auth } from '@/utils/firebase/firebaseConfig';
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

  getAll: async <T>(
    collectionName: string,
    options: FormListOptions,
    canEmpty?: boolean
  ): Promise<FormListResponse<T>> => {
    const collectionRef = collection(db, collectionName);

    const constrains: QueryConstraint[] = [];

    if (options.sort) {
      constrains.push(orderBy('updatedAt', options.sort));
    }

    if (options.limit) {
      constrains.push(limit(options.limit));
    }

    if (options.lastVisible) {
      constrains.push(startAfter(options.lastVisible));
    }

    if (
      (typeof options.search === 'string' && options.search.length) ||
      typeof options.search === 'object'
    ) {
      constrains.push(where(options.searchKey ?? 'title', '==', options.search));
    }

    if (options.reference) {
      const reference = doc(db, options.reference.collectionName, options.reference.id);
      constrains.push(where(options.reference.key, '==', reference));
    }

    const q = query(collectionRef, ...constrains);

    const docSnap = await getDocs(q);

    if (!docSnap.empty) {
      return {
        data: docSnap.docs.map((doc) => convertFirestoreData(doc)) as T,
        lastVisible: docSnap.docs[docSnap.docs.length - 1],
      };
    }

    if (canEmpty) {
      return {
        data: [] as T,
        lastVisible: undefined,
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

  login: async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return { data: { uid: user.uid, email: user.email } };
  },

  register: async (
    collectionName: string,
    email: string,
    password: string,
    name: string,
    surname: string
  ) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const docRef = doc(db, collectionName, user.uid);
    await setDoc(docRef, {
      uid: user.uid,
      firstName: name,
      lastName: surname,
      email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      uid: user.uid,
      email: user.email,
    };
  },

  logout: async () => {
    await signOut(auth);
    return true;
  },
};
