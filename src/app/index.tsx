import { Redirect } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 🔑 Replace with real auth logic
        const fakeUser = null // change to {} to simulate logged in
        setUser(fakeUser)
      } catch (e) {
        console.log(e)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Loading state
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  // Redirect based on auth
  if (!user) {
    return <Redirect href="/(auth)/login" />
  }

  return <Redirect href='/(tabs)/(home)/home'/>
}