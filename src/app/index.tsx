import { Typography } from '@/atoms'
import { AppTextStyle } from '@/atoms/Typography'
import { AuthContext } from '@/providers/AuthContext'
import { COLORS } from '@/theme/colors'
import { Redirect, useRouter } from 'expo-router'
import { useContext, useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'

export default function RootLayout() {
  const router = useRouter();

  const { isAuthenticated, user, loading, logout } = useContext(AuthContext)

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated]);

  // Loading state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        <Typography textstyle={AppTextStyle.heading5} color={COLORS.ledgerBlue}>LEDGER PAY</Typography>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  console.log({isAuthenticated},'aurthentixated')

  // Redirect based on auth
  // Not logged in → auth flow
  // if (!isAuthenticated || !user) {
  //   return <Redirect href="/(auth)/login" />
  // }

  // Logged in → main app
  return <Redirect href="/(tabs)/(home)/home" />
}