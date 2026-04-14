
import { AvatarBase, Button } from '@/atoms'
import Typography, { AppTextStyle } from '@/atoms/Typography'
import SettingsMenuItem from '@/components/Settings/SettingsMenuItem'
import { useGetUser } from '@/hooks/useGetUser'
import { SwitchOption } from '@/molecules'
import { Header } from '@/organisms'
import { AppContext } from '@/providers/AppContext'
import { AuthContext } from '@/providers/AuthContext'
import { Screen } from '@/templates'
import { COLORS } from '@/theme/colors'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useContext, useState } from 'react'
import { Alert, SectionList, StyleSheet, View } from 'react-native'

const Settings = () => {

  const [pushNotification, setPushNotification] = useState(false);
  const context = useContext(AppContext);
  const { logout, loading } = useContext(AuthContext)
  const { user, loading: loadingUser = true, refreshing: isRefreshingUser = true, refetch: refetchUser } = useGetUser();

  const router = useRouter();
  const handleLogout = () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log out',
          style: 'destructive',
          onPress: () => {

            console.log('User logged out');
            logout()
            setTimeout(() => {
              router.replace("/login");
            }, 2000)
          },
        },
      ],
      { cancelable: true }
    );
  };

  const sections = [
    {
      title: 'Preferences',
      data: [
        {
          type: 'switch',
          label: 'Hide Balance',
          value: context?.hideBalance,
          onToggle: context?.setHideBalance,
          icon: <Ionicons name={context?.hideBalance ? 'eye-off' : 'eye'} size={24} color={COLORS.ledgerBlue} />
        },
        {
          type: 'switch',
          label: 'Biometric Login',
          value: context?.biometricEnabled,
          onToggle: context?.setBiometricEnabled,
          icon: <Ionicons name='finger-print-outline' size={24} color={COLORS.ledgerBlue} />
        },
        {
          type: 'switch',
          label: 'Push Notification',
          value: pushNotification,
          onToggle: setPushNotification,
          icon: <Ionicons name={pushNotification ? 'notifications' : 'notifications-off'} size={24} color={COLORS.ledgerBlue} />
        }
      ]
    },
    {
      title: 'Appearance',
      data: [
        {
          type: 'menu',
          label: 'Mode',
          value: false,
          onToggle: () => { },
          icon: <Ionicons name='sunny-sharp' size={24} color={COLORS.ledgerBlue} />
        }
      ]
    },
    {
      title: 'Security & Legal',
      data: [
        {
          type: 'menu',
          label: 'Change Pin',
          value: false,
          onToggle: () => { },
          icon: <Ionicons name='key-outline' size={24} color={COLORS.ledgerBlue} />
        },
        {
          type: 'menu',
          label: 'Privacy Policy',
          value: false,
          onToggle: () => { },
          icon: <Ionicons name='book-outline' size={24} color={COLORS.ledgerBlue} />
        },
        {
          type: 'menu',
          label: 'Terms of Service',
          value: false,
          onToggle: () => { },
          icon: <Ionicons name='list-outline' size={24} color={COLORS.ledgerBlue} />
        }
      ]
    }
  ];

  return (
    <Screen>
      <Header title='Settings' showIconLeft={true} />

      {/* 
      - make a build.
      - send apk to google drive.
      - test for ios
      - confirm prebuild vs dev client. 
      */}


      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.label ? item.label : item.label + index}
        renderSectionHeader={({ section: { title } }) => (
          <Typography
            textstyle={AppTextStyle.bodyMedium}
            color={COLORS.ledgerBlue}
            style={style.sectionHeader}
          >
            {title}
          </Typography>
        )}
        renderItem={({ item }) => {
          if (item.type === 'switch') {
            return (
              <SwitchOption
                label={item.label}
                value={item.value}
                onToggle={item.onToggle}
                icon={item.icon}
              />
            );
          }

          return (
            <SettingsMenuItem
              title={item.label}
              icon={item.icon}
            />
          );
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => {
          return (
            <View style={{ alignItems: 'center' }}>
              <AvatarBase size={150} background={COLORS.grey100}>
                <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.heading3}>PC</Typography>
              </AvatarBase>
              <View style={{ marginVertical: 14 }}>
                <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.bodyLargeBold} textAlign='center' style={{ textTransform: 'capitalize' }}>
                  {user[0]?.lastName} {user[0]?.firstName}
                </Typography>
                <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.bodyMedium} textAlign='center' style={{ marginVertical: 4 }}>

                  {user[0]?.email}
                </Typography>
                <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.bodyMedium} textAlign='center'>
                   {user[0]?.phone}
                </Typography>
              </View>
            </View>
          )
        }}
        ListFooterComponent={() => {
          return (
            <View style={style.logout}>
              <Button
                label='Log out'
                bgColor={COLORS.oxblood}
                onPress={handleLogout}
                loading={loading}
                icon={<Ionicons name='log-out' size={24} color={COLORS.white} />}
              />
            </View>
          )
        }}
      />



    </Screen>
  )
}

export default Settings

const style = StyleSheet.create({
  sectionHeader: {
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 4
  },
  logout: {
    marginVertical: 14
  }
});