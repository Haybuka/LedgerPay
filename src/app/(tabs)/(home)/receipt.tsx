import Typography, { AppTextStyle } from '@/atoms/Typography';
import { ContactType } from '@/components/Beneficiary/types';
import { LedgerPayReceipt } from '@/components/Receipt';
import { useViewShotShare } from '@/hooks/useViewShotShare';
import { Screen } from '@/templates';
import { COLORS } from '@/theme/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

const imgUrl = require('../../../assets/images/success.png');


export const sampleTransaction = {
  id: 'TXN_20260411_001',
  type: 'debit' as 'debit' | 'credit', // or 'credit'
  amount: 5000,
  bank: 'GTBank',
  recipientName: 'Abdullahi Abdul',
  recipientAcct: '325436547',
  sessionId: 'SID_98765432123456789',
  transRef: 'REF_12345678909876543',
  dateCreated: '2026-04-11T21:15:40Z',
};

const Receipt = () => {
  const router = useRouter();

  const { item } = useLocalSearchParams<{ item?: string }>();

  const [shareReceipt, setShareReceipt] = useState(false);

  const { ref: viewShotRef, captureAndShare } = useViewShotShare();
  const shareFile = async (uri: string) => {
    try {
      const canShare = await Sharing.isAvailableAsync();
      if (!canShare) {
        console.log('Sharing is not available on this platform');
        return;
      }
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error('Error sharing file:', error);
    }
  };

  const handleShare = () => {
    setShareReceipt(true);

    setTimeout(async () => {
      try {
        const uriVal = await captureAndShare();
        if (uriVal) {
          shareFile(uriVal)
        }
      } catch (e) {

      } finally {
        setShareReceipt(false);
      }
    }, 300);
  };

  const parsedItem: ContactType | null = React.useMemo(() => {
    try {
      return item ? (JSON.parse(item) as ContactType) : null;
    } catch {
      return null;
    }
  }, [item]);

  const handleDone = () => {
    router.replace('/(tabs)/(home)/home');
  };

  const handleShareReceipt = () => {

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
          Transfer Successful
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
        <Pressable style={styles.buttonOutline} onPress={handleShare}>
          <Typography
            textstyle={AppTextStyle.bodyMedium}
            color={COLORS.ledgerBlue}
          >
            Share Receipt
          </Typography>
        </Pressable>
      </View>
      {shareReceipt && <LedgerPayReceipt ref={viewShotRef} data={sampleTransaction} />}
    </Screen>
  );
};

export default Receipt;

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
  buttonOutline: {
    width: '100%',
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.ledgerBlue,
    marginVertical: 16
  },
});