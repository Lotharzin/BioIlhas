import { usePathname, useRouter, type Href } from 'expo-router';
import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { palette } from '@/styles/theme';

type AppTab = 'inicio' | 'biomas' | 'biblioteca';

type AppShellProps = PropsWithChildren<{
  activeTab: AppTab;
}>;

const tabs: { id: AppTab; label: string; icon: string; route: Href }[] = [
  { id: 'inicio', label: 'Início', icon: '⌂', route: '/' },
  { id: 'biomas', label: 'Biomas', icon: '◎', route: '/explore' },
  { id: 'biblioteca', label: 'Biblioteca', icon: '▤', route: '/library' },
];

export function AppShell({ activeTab, children }: AppShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const selectedTab = pathname.startsWith('/reader') ? 'biblioteca' : activeTab;

  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      <View style={[styles.tabBar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
        {tabs.map((tab) => {
          const selected = selectedTab === tab.id;
          return (
            <Pressable
              key={tab.id}
              onPress={() => router.push(tab.route)}
              style={styles.tab}
              accessibilityRole="tab"
              accessibilityState={{ selected }}>
              <Text style={[styles.icon, selected && styles.selectedIcon]}>{tab.icon}</Text>
              <Text style={[styles.label, selected && styles.selectedLabel]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.background },
  content: { flex: 1 },
  tabBar: { flexDirection: 'row', paddingTop: 9, paddingBottom: 8, backgroundColor: '#0a1912', borderTopWidth: 1, borderTopColor: '#1b2d22' },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3 },
  icon: { color: '#82958a', fontSize: 21, lineHeight: 23 },
  selectedIcon: { color: palette.bright },
  label: { color: '#82958a', fontSize: 9, fontWeight: '600' },
  selectedLabel: { color: '#b8f1d2' },
});
