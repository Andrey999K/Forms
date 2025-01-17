import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/utils/firebase/firebaseConfig';
import { AuthUser } from '@/types';

export const useFirebaseAuth = () => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? { uid: user.uid, email: user.email } : null);
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { currentUser, isAuthLoading };
};
