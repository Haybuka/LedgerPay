import Header from '@/components/CustomHeader'
import Screen from '@/components/Screen'
import React from 'react'
import { StyleSheet } from 'react-native'

const SendMoney = () => {
  return (
    <Screen >
      <Header title='Send Money' showIconLeft={true} />
    </Screen>
  )
}

export default SendMoney

const styles = StyleSheet.create({})