import { Typography } from '@/atoms';
import { AppTextStyle } from '@/atoms/Typography';
import { Screen } from '@/templates';
import { COLORS } from '@/theme/colors';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';


export const formatCurrency = (amount: number, currency = 'NGN') => {
    return new Intl.NumberFormat('en-NG', {
        style: 'decimal',
        currency,
    }).format(amount);
};

export const formatAmountUi = (value: string) => {
    if (!value) return '0'

    const number = Number(value)

    if (isNaN(number)) return value

    return number.toLocaleString('en-NG')
}

const KEYS = [
    'c', '%', '/', '⌫',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '00', '='
];


const operators = ['+', '-', 'x', '/'];

const CalculatorScreen = () => {

    const [amount, setAmount] = useState('');
    const [currentInput, setCurrentInput] = useState('')
    const [justEvaluated, setJustEvaluated] = useState(false);

    const handleKeyPress = (key: string) => {

        console.log({ amount })
        if (justEvaluated && !operators.includes(key)) {
            setAmount(key);
            setCurrentInput(key);
            setJustEvaluated(false);
            return;
        }

        if (operators.includes(key)) {
            const lastChar = amount.slice(-1);
            if (operators.includes(lastChar)) return;
        }

        if ((amount === undefined)) {
            return;
        }


        if (key === 'c') {
            setAmount('');
            setCurrentInput('');
            return;
        }

        if (key === '⌫') {
            setAmount(prev => prev.slice(0, -1));
            setCurrentInput(prev => prev.slice(0, -1));
            return;
        }

        if (key === '=') {
            try {
                const expression = amount.replace(/x/g, '*');
                setCurrentInput(expression + ' =');
                const result = eval(expression); // simple eval for now
                setAmount(String(result));
                setJustEvaluated(true);
            } catch (e) {
                setAmount('Error');
            }
            return;
        }

        if (key === '%') {
            try {
                const value = eval(amount) / 100;
                setAmount(String(value));
            } catch {
                setAmount('Error');
            }
            return;
        }

        if (key === '.') {
            const parts = amount.split(/[\+\-\*\/]/);
            if (parts[parts.length - 1].includes('.')) return;
        }

        const MAX_LENGTH = 12;
        if (amount.length >= MAX_LENGTH) return;

        setAmount(prev => prev + key);
        setCurrentInput(prev => prev + key);
    };

    return (
        <Screen >

            <View>
                <Typography style={styles.liveView}>

                    {currentInput}
                </Typography>
            </View>
            <View style={styles.amountContainer}>
                {/* <Typography style={styles.currency}>$</Typography> */}
                <Typography style={styles.amount}>

                    {formatAmountUi(amount)}
                </Typography>
            </View>
            <View>
                <Pressable style={styles.button} >
                    <Typography
                        textstyle={AppTextStyle.heading8}
                        color={COLORS.white}
                        style={{ textTransform: 'uppercase' }}
                    >
                        Use as Transaction
                    </Typography>
                </Pressable>
            </View>
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
        </Screen>

    )
}


export default CalculatorScreen

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
        justifyContent: 'flex-end',
        gap: 6,
    },
    currency: {
        fontSize: 28,
        color: COLORS.grey50,
    },
    amount: {
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    liveView: {
        fontSize: 32,
        textAlign: 'right',
        color : COLORS.grey50
    },
    button: {
        width: '100%',
        backgroundColor: COLORS.ledgerBlue,
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 14
    },
    keypad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    key: {
        width: '25%',
        paddingVertical: 20,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
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