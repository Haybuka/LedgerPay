import Button from '@/components/Button'
import Header from '@/components/CustomHeader'
import Screen from '@/components/Screen'
import SettingsMenuItem from '@/components/Settings/SettingsMenuItem'
import SwitchOption from '@/components/Switch'
import { AppTextStyle, Typography } from '@/components/Typography'
import { COLORS } from '@/theme/colors'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Settings = () => {
  const safeInsets = useSafeAreaInsets()
  const [biometricLogin, setBiometricLogin] = useState(false);
  const [hideBalance, setHideBalance] = useState(false);
  const [pushNotification, setPushNotification] = useState(false);


  return (
    <Screen

    >
      <Header title='Settings' showIconLeft={true} />

      <View style={style.avatar}>
        <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.heading3} >{`PC`}</Typography>
      </View>
      <View style={{marginVertical:14}}>
        <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.bodyLargeBold} textAlign='center'>Chukwu Paschal</Typography>
        <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.bodyMedium} textAlign='center' style={{ marginVertical: 4 }}>Chukwu.Paschal@interswitch.com</Typography>
        <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.bodyMedium} textAlign='center'> {`081 664 49354`}</Typography>

      </View>
      <View>
        <SwitchOption
          label="Hide Balance"
          value={hideBalance}
          onToggle={setHideBalance}
          icon={<Ionicons name={hideBalance ? 'eye-off' : 'eye'} size={24} color={COLORS.ledgerBlue} />}
        />
        <SwitchOption
          label="Biometric Login"
          value={biometricLogin}
          onToggle={setBiometricLogin}
          icon={<Ionicons name='finger-print-outline' size={24} color={COLORS.ledgerBlue} />}
        />
        <SwitchOption
          label="Push Notification"
          value={pushNotification}
          onToggle={setPushNotification}
          icon={<Ionicons name={pushNotification ? 'notifications' : 'notifications-off'} size={24} color={COLORS.ledgerBlue} />}
        />
        <SettingsMenuItem icon={<Ionicons name='key-outline' size={24} color={COLORS.ledgerBlue} />} title="Change Pin" />
        <SettingsMenuItem icon={<Ionicons name='book-outline' size={24} color={COLORS.ledgerBlue} />} title="Privacy Policy" />
        <SettingsMenuItem icon={<Ionicons name='list-outline' size={24} color={COLORS.ledgerBlue} />} title="Terms of Service" />
      </View>
    
      <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical : 14 }}>
        <Button
          label='Log out'
          bgColor={COLORS.oxblood}
          icon={<Ionicons name='log-out' size={24} color={COLORS.white} />} />
      </View>
    </Screen>
  )
}

export default Settings

const style = StyleSheet.create({
  avatar: {
    height: 150,
    width: 150,
    borderRadius: 100,
    marginHorizontal: 'auto',
    marginVertical: 24,
    backgroundColor: COLORS.grey100,
    justifyContent: 'center',
    alignItems: 'center'
  },

})