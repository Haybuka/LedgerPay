import { Typography } from '@/atoms'
import { AppTextStyle } from '@/atoms/Typography'
import { AuthContext } from '@/providers/AuthContext'
import { COLORS } from '@/theme/colors'
import { Redirect } from 'expo-router'
import { useContext } from 'react'
import { ActivityIndicator, View } from 'react-native'

export default function RootLayout() {


  const { isAuthenticated, user, loading } = useContext(AuthContext)


  // Loading state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        <Typography textstyle={AppTextStyle.heading5} color={COLORS.ledgerBlue}>LEDGER PAY</Typography>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  // Redirect based on auth
  // if (!user) {
  //   return <Redirect href="/(auth)/login" />
  // }

  return <Redirect href='/(tabs)/(home)/home' />
}