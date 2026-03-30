import { AppTextStyle, Typography } from '@/components/Typography';
import { COLORS } from '@/theme/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Contact } from '.';

type DeleteMfbBeneficiaryProp = {
  beneficiary: Contact;
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
      {/* <ActionResponseModal
        content={{
          icon: (
            <Box
              height={120}
              width={120}
              backgroundColor={'blue50'}
              borderRadius={60}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text fontSize={45} fontWeight={'semibold'}>
                {beneficiary?.name
                  .split(' ')
                  .slice(0, 2)
                  .map(n => n[0].toUpperCase())
                  .join('')}
              </Text>
            </Box>
          ),
          title: `${beneficiary.name}`,

          message: `${beneficiary.bank} \u2731 ${beneficiary.accountNumber}`,
          buttons: [
            {
              label: 'Yes, Delete Beneficiary',
              variant: 'filled',
              onPress: () => console.log('Cancel pressed'),
              backGroundColor: '#E20E0E',
            },
            {
              label: 'No, Cancel',
              variant: 'outlined',
              onPress: () => console.log('Proceed pressed'),
            },
          ],
          messageAlignLeft: false,
        }}
        onCloseModal={() => console.log('Modal closed')}
      /> */}
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
    backgroundColor: COLORS.ledgerBlue,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
