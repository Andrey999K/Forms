import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
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
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { db, auth } from '@/utils/firebase/firebaseConfig';
import { FormListOptions, FormListResponse } from '@/types';
import { generateAvatarHash } from '@/utils/generateAvatarHash';

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
  create: async <T>(
    collectionName: string,
    payload: { id: string; [key: string]: unknown }
  ): Promise<T> => {
    const { id, ...rest } = payload;
    const data = { ...rest, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
    const docRef = doc(collection(db, collectionName), id);
    await setDoc(docRef, data);
    const docSnap = await getDoc(docRef);

    return convertFirestoreData<T>(docSnap);
  },

  getAll: async <T>(
    collectionName: string,
    options: FormListOptions,
    canEmpty?: boolean
  ): Promise<FormListResponse<T>> => {
    const collectionRef = collection(db, collectionName);

    const constrains: QueryConstraint[] = [];

    if (options.sort) {
      constrains.push(orderBy(options.sort.field, options.sort.type));
    }

    if (options.limit) {
      constrains.push(limit(options.limit));
    }

    if (options.lastVisible) {
      constrains.push(startAfter(options.lastVisible));
    }

    if (options.search) {
      constrains.push(where(options.search.key ?? 'title', '==', options.search.value));
    }

    if (options.filters?.length) {
      options.filters.forEach((filter) => {
        constrains.push(where(filter.key, filter.operator, filter.value));
      });
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

    throw new Error('Id not found');
  },

  getRef: async (
    collectionName: string,
    id: string
  ): Promise<DocumentReference<DocumentData, DocumentData>> => {
    const docRef = doc(db, collectionName, id);

    if (docRef.id) return docRef;

    throw new Error('Id not found');
  },
  get: async <T>(collectionName: string, id: string): Promise<T> => {
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
      await updateDoc(docRef, { ...updateData, updatedAt: serverTimestamp() });

      return payload;
    }

    throw new Error('Id not found');
  },

  delete: async (collectionName: string, id: string): Promise<boolean> => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    return true;
  },

  login: async (email: string, password: string): Promise<object> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return { uid: user.uid, email: user.email };
  },

  register: async (
    collectionName: string,
    email: string,
    password: string,
    name: string,
    surname: string
  ): Promise<object> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const docRef = doc(db, collectionName, user.uid);
    await setDoc(docRef, {
      uid: user.uid,
      firstName: name,
      lastName: surname,
      email,
      avatarHash: generateAvatarHash(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      uid: user.uid,
      email: user.email,
    };
  },

  logout: async (): Promise<boolean> => {
    await signOut(auth);
    return true;
  },

  resetPassword: async (email: string): Promise<boolean> => {
    await sendPasswordResetEmail(auth, email);
    return true;
  },
};
