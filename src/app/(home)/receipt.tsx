import { ContactType } from '@/components/Beneficiary';
import Screen from '@/components/Screen';
import { AppTextStyle, Typography } from '@/components/Typography';
import { COLORS } from '@/theme/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
// import { ContactType } from '.';

const imgUrl = require('../../assets/images/success.png');

const Receipt = () => {
  const router = useRouter();

  const { item } = useLocalSearchParams<{ item?: string }>();

  const parsedItem: ContactType | null = React.useMemo(() => {
    try {
      return item ? (JSON.parse(item) as ContactType) : null;
    } catch {
      return null;
    }
  }, [item]);

  const handleDone = () => {
    router.replace('/'); // go back to home or dashboard
  };

  return (
    <Screen>
      <View style={styles.container}>
        {/* Success Image */}
        <Image source={imgUrl} style={styles.image} />

        {/* Title */}
        <Typography
          textstyle={AppTextStyle.bodyMedium}
          color={COLORS.ledgerBlue}
        >
          Transfer Successful 🎉
        </Typography>

        {/* Subtitle */}
        <Typography
          textstyle={AppTextStyle.bodyMedium}
          color={COLORS.grey400}
          style={styles.subtitle}
        >
          Your transaction was completed successfully.
        </Typography>

        {/* Receipt Card */}
        {parsedItem && (
          <View style={styles.card}>
            <Row label="Recipient" value={parsedItem.name} />
            <Row label="Bank" value={parsedItem.bank} />
            <Row label="Account No." value={parsedItem.accountNumber} />
          </View>
        )}

        {/* Button */}
        <Pressable style={styles.button} onPress={handleDone}>
          <Typography
            textstyle={AppTextStyle.bodyMedium}
            color={COLORS.white}
          >
            Done
          </Typography>
        </Pressable>
      </View>
    </Screen>
  );
};

export default Receipt;

/* ---------- Reusable Row ---------- */
const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Typography textstyle={AppTextStyle.bodySmall} color={COLORS.grey400}>
      {label}
    </Typography>
    <Typography textstyle={AppTextStyle.bodyMedium} color={COLORS.ledgerBlue}>
      {value}
    </Typography>
  </View>
);

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F7F9FC',
    marginBottom: 30,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '100%',
    backgroundColor: COLORS.ledgerBlue,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
});