import React from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Transaction = () => {
  const safeInsets = useSafeAreaInsets()
  return (
    <View
      style={{
        flex: 1,
        paddingTop: safeInsets.top,
        paddingBottom: safeInsets.bottom,
        paddingHorizontal: 16,
      }}
    >
      <Text>Transaction</Text>
    </View>
  )
}

export default Transaction