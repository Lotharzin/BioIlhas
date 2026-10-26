import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseError } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  type Auth,
} from 'firebase/auth';
import { getReactNativePersistence } from '@firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

import { getFirebaseApp, isFirebaseConfigured } from '@/lib/firebase-config';

let auth: Auth | undefined;

export function getFirebaseAuth(): Auth {
  if (auth) return auth;

  const app = getFirebaseApp();
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    if (error instanceof FirebaseError && error.code === 'auth/already-initialized') {
      auth = getAuth(app);
    } else {
      throw error;
    }
  }
  return auth;
}

export async function syncReadingProgress(biomeId: string, page: number): Promise<void> {
  if (!isFirebaseConfigured) return;

  const user = getFirebaseAuth().currentUser;
  if (!user) throw new Error('Entre na sua conta para sincronizar o progresso.');
  await setDoc(
    doc(getFirestore(getFirebaseApp()), 'users', user.uid, 'progress', 'current'),
    { biomeId, page, updatedAt: new Date().toISOString() },
    { merge: true },
  );
}
