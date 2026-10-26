import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppShell } from '@/components/app-shell';
import { biomes } from '@/data/biomes';
import { getProgress, type ReadingProgress } from '@/lib/progress';
import { palette, sharedStyles } from '@/styles/theme';

export default function HomeScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState<ReadingProgress | null>(null);

  useEffect(() => {
    getProgress().then(setProgress).catch((error: unknown) => {
      console.error('Não foi possível carregar o progresso salvo.', error);
    });
  }, []);

  const currentBiome = biomes.find((biome) => biome.id === progress?.biomeId) ?? biomes[3];

  return (
    <AppShell activeTab="inicio">
      <SafeAreaView edges={['top']} style={sharedStyles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.brand}>
              <View style={styles.brandMark}><TextLeaf /></View>
              <View>
                <Text style={styles.brandName}>Bio<Text style={styles.brandAccent}>Ilhas</Text></Text>
                <Text style={styles.brandCaption}>BIOLOGIA & CONSERVAÇÃO</Text>
              </View>
            </View>
            <Pressable
              style={styles.avatar}
              accessibilityRole="button"
              accessibilityLabel="Perfil da professora"
              onPress={() => router.push('/profile')}>
              <Text style={styles.avatarText}>P</Text>
            </Pressable>
          </View>

          <View style={styles.greetingRow}>
            <View style={styles.greeting}>
              <Text style={styles.eyebrow}>✳  DOCENTE ATIVA</Text>
              <Text style={styles.title}>Olá, Profa. Patrícia! <Text style={styles.wave}>🌿</Text></Text>
              <Text style={styles.subtitle}>Pronta para a aula de hoje? Seus alunos do 8º e 9º ano estão conectados.</Text>
            </View>
            <View style={styles.calendar}><Text style={styles.calendarIcon}>▦</Text></View>
          </View>

          <Pressable
            onPress={() => router.push('/biome/mata-atlantica')}
            style={styles.classCard}
            accessibilityRole="button">
            <View style={styles.classCardTop}>
              <Text style={styles.classBiome}>🌱  MATA ATLÂNTICA</Text>
              <Text style={styles.classTime}>Hoje, às 14:30 · 9º B</Text>
            </View>
            <View style={styles.classCardBottom}>
              <View style={styles.classIsland}><Text style={styles.islandEmoji}>🏝️</Text></View>
              <View style={styles.classDetails}>
                <Text style={styles.classHeading}>Ecossistemas e biodiversidade</Text>
                <Text style={styles.classDescription}>Sua próxima aula está pronta para explorar.</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </View>
          </Pressable>

          <View style={styles.quickActions}>
            <Pressable style={styles.actionCard} onPress={() => router.push('/reader')} accessibilityRole="button">
              <View style={[styles.actionIcon, { backgroundColor: '#173f31' }]}><Text style={styles.actionEmoji}>📖</Text></View>
              <Text style={styles.actionTitle}>Continuar{'\n'}leitura</Text>
              <Text style={styles.actionMeta}>{progress ? `Página ${progress.page}` : 'Retome de onde parou'} <Text style={styles.actionArrow}>→</Text></Text>
            </Pressable>
            <Pressable style={styles.actionCard} onPress={() => router.push('/explore')} accessibilityRole="button">
              <View style={[styles.actionIcon, { backgroundColor: '#3b3622' }]}><Text style={styles.actionEmoji}>🧭</Text></View>
              <Text style={styles.actionTitle}>Explorar{'\n'}biomas</Text>
              <Text style={styles.actionMeta}>6 ilhas para descobrir <Text style={styles.actionArrow}>→</Text></Text>
            </Pressable>
          </View>

          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.sectionTitle}>Ferramentas de aula</Text>
              <Text style={styles.sectionSubtitle}>Tudo pronto para sua próxima expedição</Text>
            </View>
            <Text style={styles.more}>VER TODAS</Text>
          </View>

          <Pressable style={styles.toolRow} onPress={() => router.push('/explore')} accessibilityRole="button">
            <View style={[styles.toolIcon, { backgroundColor: '#15382c' }]}><Text style={styles.toolEmoji}>🌎</Text></View>
            <View style={styles.toolCopy}>
              <Text style={styles.toolTitle}>Mapa das Ilhas Vivas</Text>
              <Text style={styles.toolSubtitle}>Explore os seis biomas brasileiros</Text>
            </View>
            <Text style={styles.toolArrow}>›</Text>
          </Pressable>
          <Pressable style={styles.toolRow} onPress={() => router.push('/reader')} accessibilityRole="button">
            <View style={[styles.toolIcon, { backgroundColor: '#382f1b' }]}><Text style={styles.toolEmoji}>🔖</Text></View>
            <View style={styles.toolCopy}>
              <Text style={styles.toolTitle}>Retomar leitura</Text>
              <Text style={styles.toolSubtitle}>{currentBiome.name} · página {progress?.page ?? 1}</Text>
            </View>
            <Text style={styles.toolArrow}>›</Text>
          </Pressable>

          <View style={styles.tipCard}>
            <Text style={styles.tipEyebrow}>🌿  CURIOSIDADE DA SEMANA</Text>
            <Text style={styles.tipTitle}>A floresta que respira</Text>
            <Text style={styles.tipCopy}>Uma única árvore da Amazônia pode abrigar centenas de espécies diferentes.</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AppShell>
  );
}

function TextLeaf() {
  return <Text style={styles.leaf}>✿</Text>;
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 22, paddingBottom: 36, gap: 23 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandMark: { width: 38, height: 38, borderRadius: 13, backgroundColor: '#e9f5eb', alignItems: 'center', justifyContent: 'center' },
  leaf: { color: '#145b3c', fontSize: 23, fontWeight: '700' },
  brandName: { color: palette.text, fontSize: 18, fontWeight: '800', letterSpacing: -0.5 },
  brandAccent: { color: palette.green },
  brandCaption: { color: palette.muted, fontSize: 8, fontWeight: '700', letterSpacing: 1.25, marginTop: 2 },
  avatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#1bd59a', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#03251c', fontWeight: '800', fontSize: 15 },
  greetingRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 2 },
  greeting: { flex: 1, gap: 8 },
  eyebrow: { color: '#55d897', fontSize: 10, fontWeight: '800', letterSpacing: 1.05 },
  title: { color: palette.text, fontSize: 25, lineHeight: 31, fontWeight: '800', letterSpacing: -0.7 },
  wave: { fontSize: 21 },
  subtitle: { color: palette.muted, fontSize: 13, lineHeight: 19 },
  calendar: { width: 42, height: 42, borderRadius: 14, backgroundColor: '#14251f', alignItems: 'center', justifyContent: 'center' },
  calendarIcon: { color: '#b5c8bc', fontSize: 22 },
  classCard: { padding: 15, backgroundColor: '#10281f', borderRadius: 20, borderWidth: 1, borderColor: '#1a4634', gap: 15 },
  classCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 },
  classBiome: { color: '#91eab1', fontSize: 9, fontWeight: '800', letterSpacing: 0.7 },
  classTime: { color: '#a5b5aa', fontSize: 9 },
  classCardBottom: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  classIsland: { width: 58, height: 58, borderRadius: 17, backgroundColor: '#143a2c', alignItems: 'center', justifyContent: 'center' },
  islandEmoji: { fontSize: 31 },
  classDetails: { flex: 1, gap: 5 },
  classHeading: { color: palette.text, fontWeight: '700', fontSize: 13 },
  classDescription: { color: palette.muted, fontSize: 11, lineHeight: 16 },
  arrow: { color: '#93ad9d', fontSize: 25 },
  quickActions: { flexDirection: 'row', gap: 12 },
  actionCard: { flex: 1, minHeight: 150, borderRadius: 19, backgroundColor: palette.card, padding: 15, justifyContent: 'space-between' },
  actionIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  actionEmoji: { fontSize: 19 },
  actionTitle: { color: palette.text, fontSize: 16, lineHeight: 21, fontWeight: '700' },
  actionMeta: { color: palette.muted, fontSize: 10 },
  actionArrow: { color: palette.green, fontWeight: '800' },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 1 },
  sectionTitle: { color: palette.text, fontWeight: '700', fontSize: 16 },
  sectionSubtitle: { color: palette.muted, fontSize: 11, marginTop: 4 },
  more: { color: '#69dca3', fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  toolRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: -13, padding: 12, borderRadius: 16, backgroundColor: palette.card },
  toolIcon: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  toolEmoji: { fontSize: 19 },
  toolCopy: { flex: 1, gap: 4 },
  toolTitle: { color: palette.text, fontSize: 12, fontWeight: '700' },
  toolSubtitle: { color: palette.muted, fontSize: 10 },
  toolArrow: { color: '#8da799', fontSize: 24 },
  tipCard: { padding: 16, borderRadius: 18, backgroundColor: '#123327', gap: 8, borderWidth: 1, borderColor: '#1b4934' },
  tipEyebrow: { color: '#8fe2a7', fontSize: 9, fontWeight: '800', letterSpacing: 0.65 },
  tipTitle: { color: palette.text, fontSize: 15, fontWeight: '700' },
  tipCopy: { color: '#b4c7ba', fontSize: 11, lineHeight: 17 },
});
