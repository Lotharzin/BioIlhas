import { Redirect, Stack, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { AuthProvider, useAuth } from '@/contexts/auth-context';
import { palette } from '@/styles/theme';

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <AuthenticatedRoutes />
    </AuthProvider>
  );
}

function AuthenticatedRoutes() {
  const { status } = useAuth();
  const segments = useSegments();
  const isLoginRoute = segments[0] === 'login';

  if (status === 'loading') return null;
  if (status === 'signedOut' && !isLoginRoute) return <Redirect href="/login" />;
  if (status === 'signedIn' && isLoginRoute) return <Redirect href="/" />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: palette.background },
      }}
    />
  );
}
