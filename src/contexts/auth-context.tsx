import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

import { getFirebaseAuth } from '@/lib/firebase';
import { isFirebaseConfigured } from '@/lib/firebase-config';

type AuthStatus = 'loading' | 'signedOut' | 'signedIn' | 'local';

type AuthContextValue = {
  user: User | null;
  status: AuthStatus;
  isFirebaseConfigured: boolean;
  authError: string;
  signIn: (email: string, password: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState('');
  const [status, setStatus] = useState<AuthStatus>(isFirebaseConfigured ? 'loading' : 'local');

  useEffect(() => {
    if (!isFirebaseConfigured) return;

    return onAuthStateChanged(
      getFirebaseAuth(),
      (nextUser) => {
        setUser(nextUser);
        setStatus(nextUser ? 'signedIn' : 'signedOut');
        setAuthError('');
      },
      (error: Error) => {
        console.error('Falha ao verificar a sessão Firebase.', error);
        setAuthError('Não foi possível verificar sua sessão. Confira a configuração do Firebase e tente novamente.');
        setStatus('signedOut');
      },
    );
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    status,
    isFirebaseConfigured,
    authError,
    async signIn(email, password) {
      setAuthError('');
      await signInWithEmailAndPassword(getFirebaseAuth(), email.trim(), password);
    },
    async sendPasswordReset(email) {
      await sendPasswordResetEmail(getFirebaseAuth(), email.trim());
    },
    async signOut() {
      await firebaseSignOut(getFirebaseAuth());
    },
  }), [authError, status, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth precisa ser usado dentro de AuthProvider.');
  return context;
}
