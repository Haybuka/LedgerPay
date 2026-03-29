import Button from '@/components/Button'
import Header from '@/components/CustomHeader'
import Screen from '@/components/Screen'
import SwitchOption from '@/components/Switch'
import { AppTextStyle, Typography } from '@/components/Typography'
import { COLORS } from '@/theme/colors'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Settings = () => {
  const safeInsets = useSafeAreaInsets()
  const [biometricLogin, setBiometricLogin] = useState(false);
  const [hideBalance, setHideBalance] = useState(false);
  const [pushNotification, setPushNotification] = useState(false);


  return (
    <Screen
    >
      <Header title='Settings' showIconLeft={false} />

      <View style={style.avatar}>
        <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.heading3} >{`PC`}</Typography>
      </View>
      <View>
        <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.bodyLargeBold} textAlign='center'>Chukwu Paschal</Typography>
        <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.bodyMedium} textAlign='center' style={{ marginVertical: 4 }}>Chukwu.Paschal@interswitch.com</Typography>
        <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.bodyMedium} textAlign='center'> {`081 664 49354`}</Typography>

      </View>
      <View>
        <SwitchOption
          label="Hide Balance"
          value={hideBalance}
          onToggle={setHideBalance}
        />
        <SwitchOption
          label="Biometric Login"
          value={biometricLogin}
          onToggle={setBiometricLogin}
        />
        <SwitchOption
          label="Push Notification"
          value={pushNotification}
          onToggle={setPushNotification}
        />
        <Typography textstyle={AppTextStyle.bodyMedium}>Change Pin</Typography>
        <Typography textstyle={AppTextStyle.bodyMedium}>Privacy Policy</Typography>
        <Typography textstyle={AppTextStyle.bodyMedium}>Terms of Service</Typography>
      </View>
      <Pressable >
        <Typography>Log out</Typography>
      </Pressable>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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