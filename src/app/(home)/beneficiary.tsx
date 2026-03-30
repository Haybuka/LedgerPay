import BeneficiaryContactList from '@/components/Beneficiary'
import Header from '@/components/CustomHeader'
import Screen from '@/components/Screen'
import React from 'react'
import { StyleSheet } from 'react-native'

const Beneficiary = () => {
  return (
    <Screen >
      <Header title='Select Beneficiary' showIconLeft={true} />
      <BeneficiaryContactList />
    </Screen>
  )
}

export default Beneficiary

const styles = StyleSheet.create({})