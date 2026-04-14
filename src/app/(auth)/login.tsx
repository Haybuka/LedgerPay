import { createUser } from '@/api/user/user'
import { Button } from '@/atoms'
import { FormInput, Header } from '@/organisms'
import { Screen } from '@/templates'
import { useRouter } from 'expo-router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native'

export type LoginFormData = {
  email: string
  password: string
}

const Login = () => {

  const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  const router = useRouter()

  const onSubmit = async (data: LoginFormData) => {
    console.log('Login data:', data)

    await createUser({
      email: 'test@gmail.com',
      password: '123456',
    })
    // 👉 navigate after login
    // router.replace('/(tabs)/(home)')
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Header title='Login' showIconLeft={false} />

          <View style={styles.container}>

            <FormInput<LoginFormData>
              control={control}
              name="email"
              label="Email"
              placeholder="Enter your email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Enter a valid email'
                }
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <FormInput<LoginFormData>
              control={control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Minimum of 6 characters'
                }
              }}
              secureTextEntry
            />

            {/* {!isValid && (
              <Typography color={COLORS.oxblood}>
                Please fill in a valid email and password
              </Typography>
            )} */}

            <View style={{ marginVertical: 26 }}>
              <Button
                label='Login'
                icon=""
                disabled={!isValid}
                loading={isSubmitting}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </View>


        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  )
}

export default Login

const styles = StyleSheet.create({
  container: { marginVertical: 30, flex: 1, justifyContent: 'center', gap: 20 }
})