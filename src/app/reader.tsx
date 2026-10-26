import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppShell } from '@/components/app-shell';
import { biomes } from '@/data/biomes';
import { getProgress, saveProgress } from '@/lib/progress';
import { palette, sharedStyles } from '@/styles/theme';

export default function ReaderScreen() {
  const router = useRouter();
  const { biomeId } = useLocalSearchParams<{ biomeId?: string }>();
  const [selectedBiomeId, setSelectedBiomeId] = useState(biomeId ?? 'mata-atlantica');
  const [page, setPage] = useState(1);
  const [saveMessage, setSaveMessage] = useState('');
  const [isReady, setIsReady] = useState(false);
  const biome = biomes.find((item) => item.id === selectedBiomeId) ?? biomes[3];
  const totalPages = 5;

  useEffect(() => {
    getProgress().then((progress) => {
      if (progress) {
        if (!biomeId) setSelectedBiomeId(progress.biomeId);
        setPage(biomeId && biomeId !== progress.biomeId ? 1 : progress.page);
      }
      setIsReady(true);
    }).catch((error: unknown) => {
      console.error('Não foi possível carregar o progresso salvo.', error);
      setSaveMessage('Não foi possível recuperar seu progresso salvo.');
      setIsReady(true);
    });
  }, [biomeId]);

  async function changePage(nextPage: number) {
    const boundedPage = Math.max(1, Math.min(totalPages, nextPage));
    const previousPage = page;
    setPage(boundedPage);
    setSaveMessage('');
    try {
      await saveProgress({ biomeId: biome.id, page: boundedPage });
      setSaveMessage('Progresso salvo neste aparelho.');
    } catch (error) {
      console.error('Não foi possível sincronizar o progresso.', error);
      setSaveMessage('Salvo neste aparelho. A sincronização com o Firebase falhou.');
    }
    if (boundedPage === previousPage) setSaveMessage('');
  }

  return (
    <AppShell activeTab="biblioteca">
      <SafeAreaView edges={['top']} style={sharedStyles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.topRow}>
            <Pressable onPress={() => router.back()} accessibilityRole="button"><Text style={styles.back}>‹  Voltar</Text></Pressable>
            <Text style={styles.topLabel}>BIOILHAS · LEITURA</Text>
            <Text style={styles.bookmark}>🔖</Text>
          </View>
          <View style={styles.progressArea}>
            <View style={styles.progressText}><Text style={styles.chapterLabel}>{biome.name.toUpperCase()}</Text><Text style={styles.pageLabel}>PÁGINA {page} DE {totalPages}</Text></View>
            <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${(page / totalPages) * 100}%`, backgroundColor: biome.color }]} /></View>
          </View>

          <View style={styles.paper}>
            <Text style={styles.paperEyebrow}>EXPEDIÇÃO {String(page).padStart(2, '0')}  ·  {biome.region.toUpperCase()}</Text>
            <Text style={styles.paperTitle}>{page === 1 ? biome.lesson : page === 2 ? 'Uma paisagem em movimento' : page === 3 ? 'Quem vive por aqui?' : page === 4 ? 'Equilíbrio e conservação' : 'Hora de explorar'}</Text>
            <View style={[styles.illustration, { backgroundColor: `${biome.color}18` }]}>
              <Text style={styles.illustrationEmoji}>{biome.emoji}</Text>
              <Text style={[styles.illustrationCaption, { color: biome.color }]}>UM ECOSSISTEMA BRASILEIRO</Text>
            </View>
            <Text style={styles.bodyText}>{page === 1
              ? biome.description
              : `${biome.article} ${biome.name} reúne diferentes formas de vida que se relacionam entre si e com o ambiente. As características do clima, do solo e da água ajudam a explicar as paisagens que encontramos neste bioma.`}</Text>
            <Text style={styles.bodyText}>Observe como plantas, animais e elementos naturais compartilham esse espaço. Conhecer essas relações é um primeiro passo para entender por que cada bioma merece cuidado e proteção.</Text>
            <View style={styles.factBox}>
              <Text style={styles.factLabel}>🔎  VOCÊ SABIA?</Text>
              <Text style={styles.factText}>{biome.species} fazem parte da riqueza natural deste bioma. Cada espécie tem um papel importante no funcionamento do ecossistema.</Text>
            </View>
            <Text style={styles.sourceNote}>Material de demonstração · substitua pelo conteúdo didático autorizado.</Text>
          </View>

          <View style={styles.pageControls}>
            <Pressable
              onPress={() => changePage(page - 1)}
              disabled={page <= 1 || !isReady}
              style={[styles.pageButton, (page <= 1 || !isReady) && styles.disabledButton]}
              accessibilityRole="button">
              <Text style={styles.pageButtonText}>‹  Anterior</Text>
            </Pressable>
            <Text style={styles.pageCount}>{page} / {totalPages}</Text>
            <Pressable
              onPress={() => changePage(page + 1)}
              disabled={page >= totalPages || !isReady}
              style={[styles.pageButton, styles.nextButton, (page >= totalPages || !isReady) && styles.disabledButton]}
              accessibilityRole="button">
              <Text style={styles.nextButtonText}>Próxima  ›</Text>
            </Pressable>
          </View>
          {saveMessage ? <Text style={styles.saveMessage}>{saveMessage}</Text> : null}
        </ScrollView>
      </SafeAreaView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 28, gap: 19 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  back: { color: '#a6b9ac', fontSize: 13, fontWeight: '600' },
  topLabel: { color: '#8aa295', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  bookmark: { fontSize: 18 },
  progressArea: { gap: 9 },
  progressText: { flexDirection: 'row', justifyContent: 'space-between' },
  chapterLabel: { color: '#8fe1a8', fontSize: 9, fontWeight: '800', letterSpacing: 0.75 },
  pageLabel: { color: palette.muted, fontSize: 9, fontWeight: '700' },
  progressTrack: { height: 4, overflow: 'hidden', borderRadius: 3, backgroundColor: '#21372b' },
  progressFill: { height: 4, borderRadius: 3 },
  paper: { paddingHorizontal: 22, paddingVertical: 26, backgroundColor: '#f1f4ed', borderRadius: 19, gap: 17 },
  paperEyebrow: { color: '#527760', fontSize: 8, fontWeight: '800', letterSpacing: 1 },
  paperTitle: { color: '#1b3428', fontSize: 24, lineHeight: 29, fontWeight: '800', letterSpacing: -0.5 },
  illustration: { minHeight: 160, borderRadius: 15, alignItems: 'center', justifyContent: 'center', gap: 8 },
  illustrationEmoji: { fontSize: 65 },
  illustrationCaption: { fontSize: 8, fontWeight: '800', letterSpacing: 1.2 },
  bodyText: { color: '#40544a', fontSize: 12, lineHeight: 19 },
  factBox: { padding: 13, borderRadius: 12, backgroundColor: '#e2eddf', gap: 7 },
  factLabel: { color: '#38744f', fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  factText: { color: '#43584a', fontSize: 10, lineHeight: 16 },
  sourceNote: { color: '#748277', fontSize: 8, fontStyle: 'italic' },
  pageControls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  pageButton: { paddingVertical: 12, paddingHorizontal: 13, borderRadius: 13, backgroundColor: '#14291e' },
  nextButton: { backgroundColor: palette.bright },
  pageButtonText: { color: '#d6e7dc', fontSize: 11, fontWeight: '700' },
  nextButtonText: { color: '#03251c', fontSize: 11, fontWeight: '800' },
  pageCount: { color: palette.muted, fontSize: 10, fontWeight: '700' },
  disabledButton: { opacity: 0.4 },
  saveMessage: { color: '#8fe1a8', fontSize: 10, textAlign: 'center' },
});
