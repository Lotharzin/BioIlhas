import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppShell } from '@/components/app-shell';
import { biomes } from '@/data/biomes';
import { palette, sharedStyles } from '@/styles/theme';

export default function BiomeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const biome = biomes.find((item) => item.id === id) ?? biomes[0];

  return (
    <AppShell activeTab="biomas">
      <SafeAreaView edges={['top']} style={sharedStyles.safeArea}>
        <ScrollView contentContainerStyle={sharedStyles.scrollContent} showsVerticalScrollIndicator={false}>
          <Pressable onPress={() => router.back()} style={styles.backButton} accessibilityRole="button">
            <Text style={styles.backText}>‹  Voltar às ilhas</Text>
          </Pressable>

          <View style={[styles.hero, { borderColor: `${biome.color}66` }]}>
            <View style={[styles.glow, { backgroundColor: `${biome.color}22` }]} />
            <Text style={styles.heroEyebrow}>BIOMA · {biome.region.toUpperCase()}</Text>
            <Text style={styles.heroEmoji}>{biome.emoji}</Text>
            <Text style={styles.heroTitle}>{biome.name}</Text>
            <Text style={styles.heroCopy}>{biome.description}</Text>
            <View style={[styles.badge, { backgroundColor: `${biome.color}25` }]}>
              <Text style={[styles.badgeText, { color: biome.color }]}>✦  ECOSSISTEMA VIVO</Text>
            </View>
          </View>

          <View style={styles.stats}>
            <View style={styles.stat}><Text style={styles.statValue}>{biome.area}</Text><Text style={styles.statLabel}>EXTENSÃO</Text></View>
            <View style={styles.statDivider} />
            <View style={styles.stat}><Text style={styles.statValue}>{biome.species}</Text><Text style={styles.statLabel}>BIODIVERSIDADE</Text></View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionEyebrow}>EXPEDIÇÃO DE APRENDIZADO</Text>
            <Text style={styles.sectionTitle}>{biome.lesson}</Text>
            <Text style={styles.sectionCopy}>Descubra as características deste ambiente, conheça algumas espécies e explore como a conservação ajuda a manter esse ecossistema vivo.</Text>
          </View>

          <View style={styles.chapter}>
            <View style={styles.chapterIcon}><Text style={styles.chapterEmoji}>📚</Text></View>
            <View style={styles.chapterCopy}>
              <Text style={styles.chapterTitle}>Conhecendo o bioma</Text>
              <Text style={styles.chapterSubtitle}>Leitura guiada · 5 páginas</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </View>
          <Pressable
            style={styles.button}
            onPress={() => router.push({ pathname: '/reader', params: { biomeId: biome.id } })}
            accessibilityRole="button">
            <Text style={styles.buttonText}>Explorar este bioma  →</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  backButton: { alignSelf: 'flex-start', paddingVertical: 3 },
  backText: { color: '#a6b9ac', fontSize: 13, fontWeight: '600' },
  hero: { minHeight: 285, padding: 22, alignItems: 'center', justifyContent: 'center', gap: 10, borderRadius: 25, borderWidth: 1, backgroundColor: '#0c2118', overflow: 'hidden' },
  glow: { position: 'absolute', width: 220, height: 220, borderRadius: 110, top: 20 },
  heroEyebrow: { color: '#a3b9aa', fontSize: 9, fontWeight: '800', letterSpacing: 1.15 },
  heroEmoji: { fontSize: 76, marginVertical: 3 },
  heroTitle: { color: palette.text, fontSize: 27, fontWeight: '800', letterSpacing: -0.5 },
  heroCopy: { color: '#b2c4b8', fontSize: 12, lineHeight: 19, textAlign: 'center' },
  badge: { paddingVertical: 7, paddingHorizontal: 11, borderRadius: 20, marginTop: 2 },
  badgeText: { fontSize: 8, fontWeight: '800', letterSpacing: 0.65 },
  stats: { flexDirection: 'row', padding: 16, borderRadius: 18, backgroundColor: palette.card, alignItems: 'center' },
  stat: { flex: 1, gap: 7 },
  statValue: { color: palette.text, fontSize: 13, fontWeight: '700' },
  statLabel: { color: palette.muted, fontSize: 8, fontWeight: '700', letterSpacing: 0.8 },
  statDivider: { width: 1, height: 35, backgroundColor: palette.border, marginHorizontal: 12 },
  section: { gap: 8 },
  sectionEyebrow: { color: palette.green, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  sectionTitle: { color: palette.text, fontSize: 19, fontWeight: '800' },
  sectionCopy: { color: palette.muted, fontSize: 12, lineHeight: 19 },
  chapter: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 13, borderRadius: 16, backgroundColor: palette.card },
  chapterIcon: { width: 41, height: 41, borderRadius: 13, backgroundColor: '#193b2b', alignItems: 'center', justifyContent: 'center' },
  chapterEmoji: { fontSize: 19 },
  chapterCopy: { flex: 1, gap: 4 },
  chapterTitle: { color: palette.text, fontSize: 12, fontWeight: '700' },
  chapterSubtitle: { color: palette.muted, fontSize: 10 },
  chevron: { color: '#91aa9a', fontSize: 24 },
  button: { minHeight: 49, borderRadius: 15, backgroundColor: palette.bright, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#03251c', fontSize: 13, fontWeight: '800' },
});
