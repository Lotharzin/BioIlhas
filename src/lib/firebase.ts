import { getAuth, type Auth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

import { getFirebaseApp, isFirebaseConfigured } from '@/lib/firebase-config';

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
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
