import { createUser } from '@/api/user/user'
import { Button, Typography } from '@/atoms'
import { AppTextStyle } from '@/atoms/Typography'
import { FormInput } from '@/organisms'
import { Screen } from '@/templates'
import { setStorageItem } from '@/utils'
import { useRouter } from 'expo-router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'

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
    try {
      console.log('Login data:', data)

      await createUser({
        email: 'test@gmail.com',
        password: '123456',
      })

      await setStorageItem("@User", JSON.stringify(data));
      // 👉 navigate after login
      // router.replace('/(tabs)/(home)')
    } catch (error) {

    }
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >

        <View style={styles.container}>
          <View style={{ gap: 10, marginBottom: 20 }}>

            <Typography textstyle={AppTextStyle.heading7}>Welcome back</Typography>
            <Typography textstyle={AppTextStyle.bodyMedium}>
              Great to see you again! Your journey continues here.
            </Typography>
          </View>
          <View>
            <Typography textstyle={AppTextStyle.bodyMediumMedium} style={{ marginVertical: 10 }}>
              Email
            </Typography>
            <FormInput<LoginFormData>
              control={control}
              name="email"
              label=""
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
          </View>
          <View>
            <Typography textstyle={AppTextStyle.bodyMediumMedium} style={{ marginVertical: 10 }}>
              Password
            </Typography>
            <FormInput<LoginFormData>
              control={control}
              name="password"
              label=""
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
          </View>


          {/* {!isValid && (
              <Typography color={COLORS.oxblood}>
                Please fill in a valid email and password
              </Typography>
            )} */}


        </View>


        <Button
          label='Log in'
          icon=""
          disabled={!isValid}
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />


      </KeyboardAvoidingView>
    </Screen>
  )
}

export default Login

const styles = StyleSheet.create({
  container: { marginVertical: 30, flex: 1, gap: 20 }
})