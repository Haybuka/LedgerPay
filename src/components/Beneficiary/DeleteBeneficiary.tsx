
import Button from '@/atoms/Button';
import Typography, { AppTextStyle } from '@/atoms/Typography';
import { COLORS } from '@/theme/colors';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ContactType } from '.';

type DeleteMfbBeneficiaryProp = {
  beneficiary: ContactType;
};

const DeleteMfbBeneficiary: React.FC<DeleteMfbBeneficiaryProp> = ({
  beneficiary,
}) => {
  return (
    <View style={styles.container}>
      <View

        style={styles.avatar}
      >
        <Typography textstyle={AppTextStyle.heading5} color={COLORS.white}>
          {beneficiary?.name
            ?.split(' ')
            ?.slice(0, 2)
            ?.map(n => n[0].toUpperCase())
            ?.join('')}
        </Typography>
      </View>
      <View style={{ marginVertical: 14 }}>
        <Typography textAlign='center'> {`You are deleting `}</Typography>
        <Typography textAlign='center' textstyle={AppTextStyle.heading6} color={COLORS.oxblood} style={{marginVertical:6}}> {beneficiary.name}</Typography>
        <Typography textAlign='center' color={COLORS.ledgerBlue}>{beneficiary.bank} • {beneficiary.accountNumber}</Typography>
      </View>
      <View style={{ gap: 6 }}>
        <Button label='Yes, Delete Beneficiary' bgColor={COLORS.oxblood} />
        <Pressable style={[styles.btn,{ borderWidth: 1, borderColor: COLORS.ledgerBlue }]}>
          <Typography textAlign='center'>No, Cancel</Typography>
        </Pressable>
      </View>
      
    </View>
  );
};

export default DeleteMfbBeneficiary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12
  },
  avatar: {
    height: 120,
    width: 120,
    backgroundColor: COLORS.grey50,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 20,
  }
})
