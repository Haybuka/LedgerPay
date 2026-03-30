import Header from '@/components/CustomHeader'
import Screen from '@/components/Screen'
import BeneficiaryContactList from '@/components/SendMoney/BeneficiaryContact'
import React from 'react'
import { StyleSheet } from 'react-native'

const SendMoney = () => {
  return (
    <Screen >
      <Header title='Send Money' showIconLeft={true} />
      <BeneficiaryContactList />
    </Screen>
  )
}

export default SendMoney

const styles = StyleSheet.create({})