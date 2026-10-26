import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppShell } from '@/components/app-shell';
import { biomes } from '@/data/biomes';
import { palette, sharedStyles } from '@/styles/theme';

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <AppShell activeTab="biomas">
      <SafeAreaView edges={['top']} style={sharedStyles.safeArea}>
        <ScrollView contentContainerStyle={sharedStyles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.eyebrow}>ATLAS DA BIODIVERSIDADE</Text>
            <Text style={sharedStyles.pageTitle}>Ilhas do Brasil</Text>
            <Text style={sharedStyles.pageSubtitle}>Cada bioma é um mundo vivo. Escolha uma ilha e comece a explorar.</Text>
          </View>

          <View style={styles.map}>
            <View style={styles.mapLabel}><Text style={styles.mapLabelText}>✦  BRASIL · 6 BIOMAS</Text></View>
            <View style={styles.islandGrid}>
              {biomes.map((biome, index) => (
                <Pressable
                  key={biome.id}
                  onPress={() => router.push(`/biome/${biome.id}`)}
                  accessibilityRole="button"
                  style={[
                    styles.island,
                    index % 2 === 1 && styles.islandOffset,
                    { borderColor: `${biome.color}70` },
                  ]}>
                  <View style={[styles.orbit, { backgroundColor: `${biome.color}19` }]}>
                    <Text style={styles.islandEmoji}>{biome.emoji}</Text>
                  </View>
                  <Text style={styles.islandName}>{biome.name}</Text>
                  <Text style={styles.islandRegion}>{biome.region.toUpperCase()}</Text>
                  <View style={[styles.islandDot, { backgroundColor: biome.color }]} />
                </Pressable>
              ))}
            </View>
            <Text style={styles.mapFootnote}>TOQUE EM UMA ILHA PARA DESCOBRIR</Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Seis ecossistemas, um país</Text>
            <Text style={styles.count}>06</Text>
          </View>
          {biomes.map((biome) => (
            <Pressable
              key={biome.id}
              onPress={() => router.push(`/biome/${biome.id}`)}
              style={styles.biomeRow}
              accessibilityRole="button">
              <View style={[styles.rowEmoji, { backgroundColor: `${biome.color}20` }]}>
                <Text style={styles.rowEmojiText}>{biome.emoji}</Text>
              </View>
              <View style={styles.rowCopy}>
                <Text style={styles.rowName}>{biome.name}</Text>
                <Text style={styles.rowDescription}>{biome.region} · {biome.area}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  header: { gap: 7 },
  eyebrow: { color: palette.green, fontSize: 9, fontWeight: '800', letterSpacing: 1.3 },
  map: { minHeight: 365, paddingVertical: 16, paddingHorizontal: 14, backgroundColor: '#0c2118', borderWidth: 1, borderColor: '#1c3a2b', borderRadius: 23, overflow: 'hidden', justifyContent: 'space-between' },
  mapLabel: { alignSelf: 'center', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, backgroundColor: '#143b2b' },
  mapLabelText: { color: '#a3e9b7', fontSize: 9, fontWeight: '800', letterSpacing: 0.9 },
  islandGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', columnGap: 13, rowGap: 10, paddingVertical: 14 },
  island: { width: '44%', minHeight: 137, paddingVertical: 11, alignItems: 'center', justifyContent: 'center', gap: 4, borderRadius: 24, borderWidth: 1, backgroundColor: '#12281e' },
  islandOffset: { transform: [{ translateY: 8 }] },
  orbit: { width: 55, height: 55, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 3 },
  islandEmoji: { fontSize: 29 },
  islandName: { color: palette.text, fontSize: 13, fontWeight: '700' },
  islandRegion: { color: palette.muted, fontSize: 8, letterSpacing: 0.8 },
  islandDot: { position: 'absolute', width: 5, height: 5, right: 12, top: 12, borderRadius: 3 },
  mapFootnote: { alignSelf: 'center', color: '#91aa9a', fontSize: 8, fontWeight: '700', letterSpacing: 1.15, marginTop: 5 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 },
  sectionTitle: { color: palette.text, fontSize: 16, fontWeight: '700' },
  count: { color: '#69dca3', fontSize: 11, fontWeight: '800' },
  biomeRow: { flexDirection: 'row', alignItems: 'center', padding: 12, gap: 12, marginTop: -11, borderRadius: 16, backgroundColor: palette.card },
  rowEmoji: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  rowEmojiText: { fontSize: 20 },
  rowCopy: { flex: 1, gap: 4 },
  rowName: { color: palette.text, fontSize: 12, fontWeight: '700' },
  rowDescription: { color: palette.muted, fontSize: 10 },
  chevron: { color: '#91aa9a', fontSize: 24 },
});
