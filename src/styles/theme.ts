import { StyleSheet } from 'react-native';

export const palette = {
  background: '#071510',
  surface: '#0d1e17',
  card: '#11251c',
  border: '#1d382b',
  text: '#f0f5f0',
  muted: '#9aada1',
  green: '#5ade9b',
  bright: '#1bd59a',
};

export const sharedStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.background },
  safeArea: { flex: 1 },
  scrollContent: { paddingHorizontal: 22, paddingTop: 12, paddingBottom: 34, gap: 20 },
  pageTitle: { color: palette.text, fontSize: 27, lineHeight: 33, fontWeight: '800', letterSpacing: -0.6 },
  pageSubtitle: { color: palette.muted, fontSize: 13, lineHeight: 19 },
});
