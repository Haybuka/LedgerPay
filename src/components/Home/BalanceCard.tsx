import Typography, { AppTextStyle } from '@/atoms/Typography'
import { AppContext } from '@/providers/AppContext'
import { COLORS } from '@/theme/colors'
import { UserAccountType } from '@/types/userType'
import { copyToClipboard } from '@/utils/copyToClip'
import { formatCurrency } from '@/utils/currencyFormatter'
import { Ionicons } from '@expo/vector-icons'
import React, { useContext } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

type Props = {
  account: UserAccountType
}

const BalanceCard = ({ account }: Props) => {
  const { balance, currency, accountNumber } = account

  const { hideBalance, setHideBalance } = useContext(AppContext)

  const handleCopy = () => {
    copyToClipboard(accountNumber)
  }

  return (
    <View>
      {/* Header */}
      <View style={styles.container}>
        <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.bodyMedium}>
          {hideBalance ? 'Account Number' : 'Wallet Balance'}
        </Typography>

        <Pressable onPress={() => setHideBalance?.(!hideBalance)}>
          <Ionicons
            name={hideBalance ? 'eye-off' : 'eye'}
            size={24}
            color={COLORS.ledgerBlue}
          />
        </Pressable>
      </View>

      {/* Content */}
      <View style={styles.row}>
        {!hideBalance ? (
          <>
            <View style={styles.currency}>
              <Typography textstyle={AppTextStyle.bodyMedium} color={COLORS.white}>
                {currency}
              </Typography>
            </View>

            <Typography
              style={styles.balanceText}
              textstyle={AppTextStyle.heading3}
              color={COLORS.ledgerBlue}
            >
              {formatCurrency(balance)}
            </Typography>
          </>
        ) : (
          <>
            <Typography
              style={styles.balanceText}
              textstyle={AppTextStyle.heading3}
              color={COLORS.ledgerBlue}
            >
              {accountNumber}
            </Typography>

            <Pressable onPress={handleCopy}>
              <Ionicons
                name="copy-outline"
                size={20}
                color={COLORS.ledgerBlue}
              />
            </Pressable>
          </>
        )}
      </View>
    </View>
  )
}

export default BalanceCard

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  currency: {
    backgroundColor: COLORS.ledgerBlue,
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 4,
  },
  balanceText: {
    fontFamily: 'nunito-Bold',
  },
})