import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/contexts/auth-context';
import { palette } from '@/styles/theme';

export default function ProfileScreen() {
  const router = useRouter();
  const { isFirebaseConfigured, signOut, user } = useAuth();
  const [error, setError] = useState('');

  async function handleSignOut() {
    setError('');
    try {
      await signOut();
    } catch (signOutError) {
      console.error('Falha ao encerrar sessão da professora.', signOutError);
      setError('Não foi possível encerrar a sessão. Tente novamente.');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Pressable onPress={() => router.back()} style={styles.backButton} accessibilityRole="button">
          <Text style={styles.backText}>‹  Voltar</Text>
        </Pressable>
        <View style={styles.avatar}><Text style={styles.avatarText}>P</Text></View>
        <Text style={styles.title}>Perfil da professora</Text>
        <Text style={styles.name}>Patrícia</Text>
        <Text style={styles.email}>{user?.email ?? 'Modo local de demonstração'}</Text>
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>{user ? 'Conta conectada' : 'Acesso de demonstração'}</Text>
          <Text style={styles.statusCopy}>
            {user
              ? 'Seu progresso de leitura pode ser sincronizado com sua conta Firebase.'
              : isFirebaseConfigured
                ? 'Entre com sua conta de professora para sincronizar seus conteúdos.'
                : 'Configure o Firebase para ativar o login e a sincronização entre dispositivos.'}
          </Text>
        </View>
        {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
        {user ? (
          <Pressable onPress={handleSignOut} style={styles.button} accessibilityRole="button">
            <Text style={styles.buttonText}>Sair da conta</Text>
          </Pressable>
        ) : (
          <Pressable onPress={() => router.push('/login')} style={styles.button} accessibilityRole="button">
            <Text style={styles.buttonText}>Entrar com Firebase  →</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.background },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 25 },
  backButton: { position: 'absolute', top: 16, left: 24 },
  backText: { color: '#a6b9ac', fontSize: 12, fontWeight: '600' },
  avatar: { width: 66, height: 66, borderRadius: 33, backgroundColor: palette.bright, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },
  avatarText: { color: '#03251c', fontSize: 25, fontWeight: '800' },
  title: { color: palette.text, fontSize: 23, fontWeight: '800', textAlign: 'center', marginTop: 17 },
  name: { color: palette.text, fontSize: 16, fontWeight: '700', textAlign: 'center', marginTop: 17 },
  email: { color: palette.muted, fontSize: 12, textAlign: 'center', marginTop: 4 },
  statusCard: { backgroundColor: palette.card, borderRadius: 16, padding: 15, gap: 7, marginTop: 25, borderWidth: 1, borderColor: palette.border },
  statusTitle: { color: '#9ce7b6', fontSize: 12, fontWeight: '700' },
  statusCopy: { color: palette.muted, fontSize: 11, lineHeight: 17 },
  error: { color: '#f5b9a9', fontSize: 11, marginTop: 12 },
  button: { minHeight: 48, borderRadius: 14, backgroundColor: palette.bright, alignItems: 'center', justifyContent: 'center', marginTop: 18 },
  buttonText: { color: '#03251c', fontSize: 12, fontWeight: '800' },
});
