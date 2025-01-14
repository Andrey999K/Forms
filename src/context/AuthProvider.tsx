// import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '@/utils/firebase/firebaseConfig';

// interface AuthContextValue {
//   user: firebase.User | null;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth должен использоваться внутри AuthProvider');
//   }
//   return context;
// };
