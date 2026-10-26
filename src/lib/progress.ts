import AsyncStorage from '@react-native-async-storage/async-storage';

import { syncReadingProgress } from '@/lib/firebase';

const PROGRESS_KEY = '@bioilhas/reading-progress';

export type ReadingProgress = {
  biomeId: string;
  page: number;
};

export async function getProgress(): Promise<ReadingProgress | null> {
  const value = await AsyncStorage.getItem(PROGRESS_KEY);
  if (!value) return null;

  const progress: unknown = JSON.parse(value);
  if (
    typeof progress !== 'object' ||
    progress === null ||
    !('biomeId' in progress) ||
    typeof progress.biomeId !== 'string' ||
    !('page' in progress) ||
    typeof progress.page !== 'number' ||
    !Number.isInteger(progress.page) ||
    progress.page < 1
  ) {
    throw new Error('O progresso salvo está em um formato inválido.');
  }
  return { biomeId: progress.biomeId, page: progress.page };
}

export async function saveProgress(progress: ReadingProgress): Promise<void> {
  await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  await syncReadingProgress(progress.biomeId, progress.page);
}
