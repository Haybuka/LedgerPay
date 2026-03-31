import AmountDetails from '@/components/Amount/AmountDetails';
import { ContactType } from '@/components/Beneficiary';
import Button from '@/components/Button';
import Header from '@/components/CustomHeader';
import Screen from '@/components/Screen';
import BottomSheetUsage from '@/components/SheetModal';
import { AppTextStyle, Typography } from '@/components/Typography';
import { COLORS } from '@/theme/colors';
import BottomSheet from '@gorhom/bottom-sheet';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';

type AmountInputParams = {
    recipient?: string;
};

const KEYS = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '.', '0', '⌫'
];

const AmountInput = () => {
    const { recipient } = useLocalSearchParams<AmountInputParams>();
    const router = useRouter()

    const recipientAccount: ContactType | null = recipient
        ? JSON.parse(recipient)
        : null;

    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const sheetRef = useRef<BottomSheet>(null);
    const formatAmount = (value: string) => {
        if (!value) return '0'

        const number = Number(value)

        if (isNaN(number)) return value

        return number.toLocaleString('en-NG')
    }

    const handleKeyPress = (key: string) => {
        if (key === '⌫') {
            setAmount(prev => prev.slice(0, -1));
            return;
        }

        if (key === '.') {
            // prevent multiple dots
            if (amount.includes('.')) return;
        }
        const MAX_LENGTH = 9;
        if (amount.replace('.', '').length >= MAX_LENGTH) return;
        setAmount(prev => prev + key);
    };

    const handleSubmit = () => {
        const data = { ...recipientAccount, amount };
        setIsLoading(true)
        // console.log(data, 'data here');
        sheetRef.current?.snapToIndex(0);
    }
    const handleShowReceipt = () => {
        router.push('/receipt');
    }
    const handleClose = () => {
       sheetRef.current?.close();
       setIsLoading(false)
    }
    return (
        <Screen>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Header title='Enter Amount' showIconLeft={true} />

                    <View style={styles.container}>

                        {/* Recipient */}
                        {recipientAccount && (
                            <Typography style={styles.recipient}>
                                {recipientAccount.name}
                            </Typography>
                        )}

                        {/* Amount Display */}
                        <View style={styles.amountContainer}>
                            <Typography style={styles.currency}>$</Typography>
                            <Typography style={styles.amount}>

                                {formatAmount(amount)}
                            </Typography>
                        </View>

                        {/* Keypad */}
                        <View style={styles.keypad}>
                            {KEYS.map((key) => (
                                <Pressable
                                    key={key}
                                    onPress={() => handleKeyPress(key)}
                                    style={styles.key}
                                >
                                    <Typography style={styles.keyText}>
                                        {key}
                                    </Typography>
                                </Pressable>
                            ))}
                        </View>

                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <Button
                            label='Continue'
                            icon=""
                            disabled={amount.length <= 0}
                            loading={isLoading}
                            onPress={handleSubmit}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <BottomSheetUsage
                ref={sheetRef}
                onChange={() => {

                }}
            >
                <View>
                    <Typography textstyle={AppTextStyle.heading7}>Confirm Transfer</Typography>
                </View>
                <View style={{ paddingVertical: 24 }}>
                    <AmountDetails label='Name' value={`${recipientAccount?.name}`} />
                    <AmountDetails label='Bank' value={`${recipientAccount?.bank}`} />
                    <AmountDetails label='Bank Account' value={`${recipientAccount?.accountNumber}`} />
                    <AmountDetails label='Note' value={`${recipientAccount?.note}`} />

                </View>
                <View style={{ marginVertical: 14, borderWidth: 1, borderColor: COLORS.grey500, padding: 14, borderRadius: 8, backgroundColor: COLORS.grey600 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <Typography textstyle={AppTextStyle.bodyMedium} color={COLORS.grey400}>Amount</Typography>
                        <Typography textstyle={AppTextStyle.bodyMedium} color={COLORS.grey400}>{`$ ${amount}`}</Typography>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center', }}>
                        <Typography textstyle={AppTextStyle.bodyMedium} color={COLORS.grey400}>Fee</Typography>
                        <Typography textstyle={AppTextStyle.bodyMedium} color={COLORS.grey400}>{`$ ${0}`}</Typography>
                    </View>
                    <View style={{ borderBottomWidth: 0.2, borderColor: COLORS.grey400, marginVertical: 8 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center', }}>
                        <Typography textstyle={AppTextStyle.bodyLarge} color={COLORS.grey400}>Total</Typography>
                        <Typography textstyle={AppTextStyle.heading7} style={{ fontSize: 18 }} color={COLORS.grey400}>{`$ ${amount}`}</Typography>
                    </View>
                </View>
                <View style={{ marginVertical: 20, gap: 10 }}>
                    <Button
                        label='Confirm Payment'
                        icon=""
                        onPress={handleShowReceipt}
                    />
                    <Pressable onPress={handleClose} style={[styles.btn, { borderWidth: 1, borderColor: COLORS.ledgerBlue }]}>
                        <Typography textAlign='center'>Cancel</Typography>
                    </Pressable>
                </View>
            </BottomSheetUsage>
        </Screen>
    );
};

export default AmountInput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    recipient: {
        textAlign: 'center',
        opacity: 0
    },
    amountContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
    },
    currency: {
        fontSize: 28,
        color: COLORS.grey50,
    },
    amount: {
        fontSize: 42,
        fontWeight: 'bold',
    },
    keypad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    key: {
        width: '30%',
        paddingVertical: 20,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    keyText: {
        fontSize: 24,
        fontWeight: '600',
    },
    btn: {
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 12,
        paddingVertical: 14,
        borderRadius: 20,
    }
});