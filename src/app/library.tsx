import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppShell } from '@/components/app-shell';
import { biomes } from '@/data/biomes';
import { getProgress, type ReadingProgress } from '@/lib/progress';
import { palette, sharedStyles } from '@/styles/theme';

export default function LibraryScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState<ReadingProgress | null>(null);
  const biome = biomes.find((item) => item.id === progress?.biomeId) ?? biomes[3];

  useEffect(() => {
    getProgress().then(setProgress).catch((error: unknown) => {
      console.error('Não foi possível carregar o progresso salvo.', error);
    });
  }, []);

  return (
    <AppShell activeTab="biblioteca">
      <SafeAreaView edges={['top']} style={sharedStyles.safeArea}>
        <ScrollView contentContainerStyle={sharedStyles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.eyebrow}>SEU ESPAÇO DE APRENDIZADO</Text>
            <Text style={sharedStyles.pageTitle}>Biblioteca</Text>
            <Text style={sharedStyles.pageSubtitle}>Materiais de aula e leituras organizados para acompanhar suas turmas.</Text>
          </View>

          <View style={styles.resumeCard}>
            <View style={styles.bookCover}>
              <Text style={styles.coverIcon}>{biome.emoji}</Text>
              <Text style={styles.coverCaption}>BIOILHAS</Text>
            </View>
            <View style={styles.resumeCopy}>
              <Text style={styles.resumeLabel}>CONTINUE DE ONDE PAROU</Text>
              <Text style={styles.resumeTitle}>{biome.name}</Text>
              <Text style={styles.resumeText}>{biome.lesson}</Text>
              <Text style={styles.resumePage}>Página {progress?.page ?? 1} · leitura em andamento</Text>
            </View>
          </View>
          <Pressable style={styles.primaryButton} onPress={() => router.push('/reader')} accessibilityRole="button">
            <Text style={styles.primaryButtonText}>Continuar leitura  →</Text>
          </Pressable>

          <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Conteúdos por bioma</Text></View>
          {biomes.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => router.push(`/biome/${item.id}`)}
              style={styles.contentRow}
              accessibilityRole="button">
              <View style={[styles.contentIcon, { backgroundColor: `${item.color}20` }]}><Text style={styles.emoji}>{item.emoji}</Text></View>
              <View style={styles.contentCopy}>
                <Text style={styles.contentName}>{item.name}</Text>
                <Text style={styles.contentDescription}>{item.lesson}</Text>
                <View style={styles.progressTrack}><View style={[styles.progressFill, { width: item.id === progress?.biomeId ? '40%' : '8%', backgroundColor: item.color }]} /></View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          ))}
          <Text style={styles.note}>Os materiais apresentados são uma amostra educativa. Adicione os conteúdos autorizados da sua turma para completar a biblioteca.</Text>
        </ScrollView>
      </SafeAreaView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  header: { gap: 7 },
  eyebrow: { color: palette.green, fontSize: 9, fontWeight: '800', letterSpacing: 1.1 },
  resumeCard: { flexDirection: 'row', gap: 15, padding: 16, borderRadius: 20, backgroundColor: '#10271d', borderWidth: 1, borderColor: '#1d4632' },
  bookCover: { width: 90, minHeight: 124, borderRadius: 13, backgroundColor: '#176344', alignItems: 'center', justifyContent: 'center', gap: 9 },
  coverIcon: { fontSize: 37 },
  coverCaption: { color: '#c3f5d4', fontSize: 8, fontWeight: '800', letterSpacing: 1.5 },
  resumeCopy: { flex: 1, justifyContent: 'center', gap: 7 },
  resumeLabel: { color: '#83dfa8', fontSize: 8, fontWeight: '800', letterSpacing: 0.7 },
  resumeTitle: { color: palette.text, fontSize: 18, fontWeight: '800' },
  resumeText: { color: palette.muted, fontSize: 11 },
  resumePage: { color: '#a9b8ae', fontSize: 10 },
  primaryButton: { minHeight: 48, borderRadius: 15, backgroundColor: palette.bright, alignItems: 'center', justifyContent: 'center', marginTop: -11 },
  primaryButtonText: { color: '#03251c', fontSize: 13, fontWeight: '800' },
  sectionHeader: { marginTop: 6 },
  sectionTitle: { color: palette.text, fontSize: 16, fontWeight: '700' },
  contentRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, marginTop: -11, borderRadius: 16, backgroundColor: palette.card },
  contentIcon: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 20 },
  contentCopy: { flex: 1, gap: 5 },
  contentName: { color: palette.text, fontSize: 12, fontWeight: '700' },
  contentDescription: { color: palette.muted, fontSize: 10 },
  progressTrack: { height: 3, overflow: 'hidden', borderRadius: 3, backgroundColor: '#273b30', marginTop: 2 },
  progressFill: { height: 3, borderRadius: 3 },
  chevron: { color: '#91aa9a', fontSize: 24 },
  note: { color: '#819388', fontSize: 10, lineHeight: 15, marginTop: 2 },
});
