import Button from '@/atoms/Button'
import { Typography } from '@/atoms/Typography'
import { ContactType } from '@/components/Beneficiary'
import Header from '@/organisms/CustomHeader'
import { FormInput } from '@/organisms/FormInput'
import Screen from '@/templates/Screen'
import { COLORS } from '@/theme/colors'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, } from 'react'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native'

type SendMoneyParams = {
  item?: string;
};

export type FormData = {
  accountNumber: string
  bank: string
  name: string
  note: string
}

const SendMoney = () => {

  const { item } = useLocalSearchParams<SendMoneyParams>();
  const accountSelected: ContactType | null = item
    ? JSON.parse(item)
    : null;



  const { control, handleSubmit, reset, formState: { isValid, isSubmitting, errors } } = useForm<FormData>({
    defaultValues: {
      accountNumber: accountSelected?.accountNumber ?? '',
      bank: accountSelected?.bank ?? '',
      name: accountSelected?.name ?? '',
      note: '',
    },
    mode: 'all',
  });



  useEffect(() => {
    if (accountSelected) {
      reset({
        accountNumber: accountSelected.accountNumber ?? '',
        bank: accountSelected.bank ?? '',
        name: accountSelected.name ?? '',
        note: '',
      });
    }
  }, [item]);

  const router = useRouter()

  const onSubmit = (data: FormData) => {
    console.log(data,'data')
    router.push({
      pathname: '/amountInput',
      params: {
        recipient: JSON.stringify(data)
      },
    });
  }
  return (
    <Screen >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Header title='Send Money' showIconLeft={true} />


          <View style={{ marginVertical: 30, flex: 1 }}>

            <FormInput<FormData>
              control={control}
              name="accountNumber"
              label="To"
              placeholder="Account number"
              editable={!accountSelected?.accountNumber}
              rules={{ required: 'Account number is required' }}
              keyboardType="numeric"      // numeric keyboard
              maxLength={12}

            />
            <FormInput<FormData>
              control={control}
              name="bank"
              label="Bank"
              editable={!accountSelected?.bank}
              placeholder="Bank Name"
              rules={{ required: 'Bank Name is required' }}
            />

            <FormInput<FormData>
              control={control}
              name="name"
              label="Name"
              placeholder="Recipient Name"
              editable={!accountSelected?.name}
              rules={{ required: 'Receipient Name is required' }}
            />
            <FormInput<FormData>
              control={control}
              name="note"
              label=""
              placeholder="Add a note"

            />
            {!isValid && (
              <Typography color={COLORS.oxblood}>
                Only note field can be blank
              </Typography>
            )}

          </View>
          <Button
            label='Continue'
            icon=""
            disabled={!isValid}
            loading={isSubmitting}
            onPress={handleSubmit(onSubmit)}
          />
        </ScrollView>
      </KeyboardAvoidingView>

    </Screen>
  )
}

export default SendMoney

const styles = StyleSheet.create({
  inputContainer: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.grey50,
    borderRadius: 14,
    marginBottom: 14
  },
  inputInner: {
    position: "relative",
    justifyContent: "center",
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
})