import Typography, { AppTextStyle } from '@/atoms/Typography';
import { COLORS } from '@/theme/colors';
import { formatCurrency } from '@/utils/currencyFormatter';
import React, { forwardRef } from 'react';
import {
    ImageBackground,
    StyleSheet,
    useWindowDimensions,
    View,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import LedgerPayReceiptEllipse from './ReceiptEllipse';
import SuccessTag from './SuccessTag';

const images = [
  require('../../assets/images/receipt_1.png'),
  require('../../assets/images/receipt_2.png'),
];

type Props = {
  data: {
    id: string;
    type: 'debit' | 'credit';
    amount: number;
    bank: string;
    recipientName: string;
    recipientAcct: string;
    sessionId: string;
    transRef: string;
    dateCreated?: string;
  };
};

const LedgerReceipt = forwardRef<any, Props>(({ data }, ref) => {
  const { width } = useWindowDimensions();

  const innerReceiptWidth = width - 64;
  const ellipseWidth = 20;

  const isDebit = data.type === 'debit';

  return (
    <ViewShot
      ref={ref}
      options={{ format: 'png', quality: 1, result: 'tmpfile' }}
      style={styles.root}
    >
      <View style={styles.container}>
        <ImageBackground source={images[0]} style={styles.flex}>
          
          {/* Header */}
          <Typography
            textstyle={AppTextStyle.bodyLargeBold}
            textAlign="center"
            style={styles.header}
            color={COLORS.white}
          >
            Ledger Pay
          </Typography>

          <ImageBackground source={images[1]} style={styles.innerBg}>
            
            <View style={styles.card}>
              
              {/* Title */}
              <Typography
                textstyle={AppTextStyle.bodyLarge}
                textAlign="center"
                style={styles.title}
                color={COLORS.ledgerBlue}
              >
                Transaction Receipt
              </Typography>

              {/* Amount */}
              <View style={styles.center}>
                <Typography
                  textstyle={AppTextStyle.heading3}
                  textAlign="center"
                  color={COLORS.ledgerBlue}
                >
                  {isDebit ? '-' : ''}
                  {formatCurrency(data.amount)}
                </Typography>

                <SuccessTag text="Successful" />
              </View>

              {/* Details */}
              <View style={styles.details}>
                <Typography>Bank: {data.bank}</Typography>
                <Typography>Name: {data.recipientName}</Typography>
                <Typography>Account: {data.recipientAcct}</Typography>
                <Typography>Transaction ID: {data.transRef}</Typography>
                <Typography>Session ID: {data.sessionId}</Typography>
              </View>

              {/* Ellipse */}
              <View style={[styles.ellipseContainer, { width: innerReceiptWidth }]}>
                {Array.from({ length: innerReceiptWidth / ellipseWidth }).map((_, i) => (
                  <LedgerPayReceiptEllipse
                    key={i}
                    left={i * 25}
                    bottom={-3}
                    width={ellipseWidth}
                  />
                ))}
              </View>

            </View>
          </ImageBackground>
        </ImageBackground>
      </View>
    </ViewShot>
  );
});

export default LedgerReceipt;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.ledgerBlue,
  },
  flex: {
    flex: 1,
  },
  innerBg: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    paddingVertical: 14,
  },
  card: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
  },
  title: {
    marginVertical: 24,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  details: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    rowGap: 12,
  },
  ellipseContainer: {
    marginTop: 16,
    height: 10,
    alignSelf: 'center',
    overflow: 'hidden',
  },
});