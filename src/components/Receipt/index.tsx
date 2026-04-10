import { COLORS } from '@/theme/colors';
import React, { forwardRef, useRef } from 'react';
import { ImageBackground, StyleSheet, useWindowDimensions, View } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { AppTextStyle, Typography } from '../../atoms/Typography';
import LedgerPayReceiptEllipse from './ReceiptEllipse';
import SuccessTag from './SuccessTag';

const  TRANSACTION_DETAILS = {
  tranDate: Date.now() / 1000,
  amount: 5000,
  fees: 0,
  transactionType: 'Deposit to Bank',
  recipientAcct: '325436547',
  bank: 'GTBank',
  recipientName: 'Abdullahi Abdul',
  transRef: '325465477856534536',
  sessionId: '325465477856534536',
};

const images = [
    require('../../assets/images/receipt_1.png'),
    require('../../assets/images/receipt_2.png'),
];

interface LedgerPayReceiptProps {
    transactionDetails?: any;
}

const LedgerPayReceipt = forwardRef<any, LedgerPayReceiptProps>((props, ref) => {
    const viewShotRef = useRef(null);
    const { width: screenWidth } = useWindowDimensions();
    const screenPadding = 32;
    const innerReceiptWidth = Math.round(screenWidth - screenPadding * 2);
    const ellipseWidth = 20;

    const {
        tranDate,
        amount,
        bank,
        recipientName,
        recipientAcct,
        fees,
        transactionType,
        transRef,
        sessionId,
    } = TRANSACTION_DETAILS;



    return (
        <ViewShot ref={ref} options={{ format: 'png', quality: 1, result: 'tmpfile' }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, flex: 1 }}>
            <View style={{ backgroundColor: COLORS.ledgerBlue, flex: 1 }} >
                <ImageBackground source={images[0]} style={{ flex: 1 }}>
                    <Typography textstyle={AppTextStyle.bodyLargeBold} textAlign='center' style={{ paddingVertical: 14, color: COLORS.ledgerBlue }}>
                        Ledger Pay
                    </Typography>
                    <ImageBackground source={images[1]} style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 16 }}>
                        <View style={{ borderTopRightRadius: 34, borderTopLeftRadius: 34 }}>
                            <Typography color={COLORS.white} textstyle={AppTextStyle.bodyLarge} textAlign='center' style={{marginVertical : 24}}>
                                Transaction Receipt
                            </Typography>

                            <View style={{justifyContent : 'center',alignItems : 'center'}}>
                                <Typography textstyle={AppTextStyle.bodyLarge} textAlign='center'>
                                    Amount
                                </Typography>
                                <Typography textstyle={AppTextStyle.bodyLarge} textAlign='center' >
                                    -{5000}
                                </Typography>
                                <SuccessTag text="Successful" />
                            </View>

                            <View
                                style={{  rowGap : 16, paddingHorizontal : 16, paddingVertical : 11, borderRadius : 12, marginTop : 16 }}
                              
                            >

                                {/* <TransactionDetailItem
                                    item={{
                                        desc: 'Date',
                                        val: `${convertUnixToDate(tranDate)}, ${formatTimeToAmPm(
                                            new Date(tranDate * 1000)
                                        )}`,
                                    }}
                                    renderDivider={false}
                                    scaledText
                                />
                                <TransactionDetailItem
                                    item={{ desc: 'Fees & Taxes', val: `${currencyFormat(fees, undefined)}` }}
                                    renderDivider={false}
                                    `scaledText
                                />
                                <TransactionDetailItem
                                    item={{ desc: 'Transaction Type', val: transactionType }}
                                    renderDivider={false}
                                    scaledText
                                /> */}
                            </View>

                            <View style={[styles.ellipseContainer,{width : innerReceiptWidth}]}>
                                {Array.from({ length: innerReceiptWidth / ellipseWidth }).map((_, i) => (
                                    <LedgerPayReceiptEllipse key={i} left={i * 25} bottom={-3} width={ellipseWidth} />
                                ))}
                            </View>
                        </View>
                    </ImageBackground>
                </ImageBackground>
            </View>
        </ViewShot>
    );
});

export default LedgerPayReceipt;

const styles = StyleSheet.create({
    ellipseContainer: {
        marginTop: 16, height: 10, alignSelf: 'center', overflow: 'hidden'
    }
})