import { FirebaseError } from 'firebase/app';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/contexts/auth-context';
import { palette } from '@/styles/theme';

export default function LoginScreen() {
  const router = useRouter();
  const { authError, isFirebaseConfigured, sendPasswordReset, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignIn() {
    setMessage('');
    if (!email.trim() || !password) {
      setMessage('Informe seu e-mail e sua senha para continuar.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn(email, password);
    } catch (error) {
      console.error('Falha no login da professora.', error);
      setMessage(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handlePasswordReset() {
    setMessage('');
    if (!email.trim()) {
      setMessage('Digite seu e-mail para receber o link de redefinição.');
      return;
    }

    setIsSubmitting(true);
    try {
      await sendPasswordReset(email);
      setMessage('Se este e-mail estiver cadastrado, você receberá instruções para redefinir a senha.');
    } catch (error) {
      console.error('Falha ao solicitar redefinição de senha.', error);
      setMessage(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {!isFirebaseConfigured ? (
            <Pressable onPress={() => router.replace('/')} style={styles.backButton} accessibilityRole="button">
              <Text style={styles.backText}>‹  Voltar ao BioIlhas</Text>
            </Pressable>
          ) : null}

          <View style={styles.brandMark}><Text style={styles.brandIcon}>✿</Text></View>
          <Text style={styles.brand}>Bio<Text style={styles.brandAccent}>Ilhas</Text></Text>
          <Text style={styles.eyebrow}>ESPAÇO DA PROFESSORA</Text>
          <Text style={styles.title}>Que bom ter você de volta!</Text>
          <Text style={styles.subtitle}>Entre para acessar suas aulas e continuar explorando os biomas.</Text>

          <View style={styles.form}>
            <Text style={styles.label}>E-MAIL</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="professora@escola.com"
              placeholderTextColor="#718579"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              keyboardAppearance="dark"
              style={styles.input}
              editable={isFirebaseConfigured && !isSubmitting}
            />
            <Text style={styles.label}>SENHA</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Sua senha"
              placeholderTextColor="#718579"
              secureTextEntry
              autoComplete="current-password"
              textContentType="password"
              keyboardAppearance="dark"
              onSubmitEditing={handleSignIn}
              style={styles.input}
              editable={isFirebaseConfigured && !isSubmitting}
            />
            <Pressable
              onPress={handlePasswordReset}
              disabled={!isFirebaseConfigured || isSubmitting}
              style={styles.resetButton}
              accessibilityRole="button">
              <Text style={styles.resetText}>Esqueceu a senha?</Text>
            </Pressable>
          </View>

          {message || authError ? (
            <Text accessibilityRole="alert" style={styles.message}>{message || authError}</Text>
          ) : null}

          {!isFirebaseConfigured ? (
            <View style={styles.setupNotice}>
              <Text style={styles.setupTitle}>Conecte seu projeto Firebase</Text>
              <Text style={styles.setupCopy}>Preencha as variáveis Firebase no arquivo .env.local e habilite E-mail/senha em Authentication para ativar o login.</Text>
            </View>
          ) : null}

          <Pressable
            onPress={handleSignIn}
            disabled={!isFirebaseConfigured || isSubmitting}
            style={[styles.submitButton, (!isFirebaseConfigured || isSubmitting) && styles.disabledButton]}
            accessibilityRole="button">
            <Text style={styles.submitText}>{isSubmitting ? 'Aguarde...' : 'Entrar na minha conta  →'}</Text>
          </Pressable>

          <Text style={styles.footer}>BIOILHAS · APRENDER É EXPLORAR</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function getAuthErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/invalid-email':
        return 'Confira o formato do e-mail informado.';
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'E-mail ou senha incorretos.';
      case 'auth/user-disabled':
        return 'Esta conta está desativada. Fale com a administração da escola.';
      case 'auth/too-many-requests':
        return 'Muitas tentativas. Aguarde um pouco e tente novamente.';
      case 'auth/network-request-failed':
        return 'Sem conexão com a internet. Verifique a rede e tente novamente.';
      case 'auth/operation-not-allowed':
        return 'Ative o login por e-mail e senha nas configurações de Authentication do Firebase.';
    }
  }
  return 'Não foi possível concluir a solicitação. Verifique a conexão e tente novamente.';
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.background },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 28, paddingVertical: 25 },
  backButton: { position: 'absolute', top: 14, left: 24, paddingVertical: 10, zIndex: 1 },
  backText: { color: '#a6b9ac', fontSize: 12, fontWeight: '600' },
  brandMark: { width: 50, height: 50, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 17, backgroundColor: '#e9f5eb', marginBottom: 12 },
  brandIcon: { color: '#145b3c', fontSize: 30, fontWeight: '700' },
  brand: { color: palette.text, textAlign: 'center', fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  brandAccent: { color: palette.green },
  eyebrow: { color: palette.green, textAlign: 'center', fontSize: 8, fontWeight: '800', letterSpacing: 1.5, marginTop: 8 },
  title: { color: palette.text, textAlign: 'center', fontSize: 25, lineHeight: 31, fontWeight: '800', marginTop: 25 },
  subtitle: { color: palette.muted, textAlign: 'center', fontSize: 12, lineHeight: 18, marginTop: 8, marginBottom: 25 },
  form: { gap: 9 },
  label: { color: '#9eafa4', fontSize: 9, fontWeight: '800', letterSpacing: 1, marginTop: 4 },
  input: { minHeight: 49, borderWidth: 1, borderColor: '#284336', borderRadius: 13, backgroundColor: '#10231a', color: palette.text, paddingHorizontal: 14, fontSize: 13 },
  resetButton: { alignSelf: 'flex-end', paddingVertical: 5 },
  resetText: { color: '#82d9a2', fontSize: 11, fontWeight: '600' },
  message: { color: '#f5b9a9', fontSize: 11, lineHeight: 16, marginTop: 10 },
  setupNotice: { padding: 13, borderRadius: 13, backgroundColor: '#172b20', borderWidth: 1, borderColor: '#314833', marginTop: 10, gap: 5 },
  setupTitle: { color: '#d5e9da', fontSize: 11, fontWeight: '700' },
  setupCopy: { color: '#a8b9ae', fontSize: 10, lineHeight: 15 },
  submitButton: { minHeight: 49, borderRadius: 14, backgroundColor: palette.bright, justifyContent: 'center', alignItems: 'center', marginTop: 19 },
  disabledButton: { opacity: 0.45 },
  submitText: { color: '#03251c', fontSize: 12, fontWeight: '800' },
  footer: { color: '#5f7767', textAlign: 'center', fontSize: 8, fontWeight: '700', letterSpacing: 1.2, marginTop: 24 },
});
