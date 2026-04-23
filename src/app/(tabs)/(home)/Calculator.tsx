
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


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

interface Key {
    value: string;
    type: 'number' | 'operator' | 'action';
}

const KEYS: Key[] = [
    { value: '7', type: 'number' }, { value: '8', type: 'number' }, { value: '9', type: 'number' }, { value: '⌫', type: 'action' }, { value: '/', type: 'operator' },
    { value: '4', type: 'number' }, { value: '5', type: 'number' }, { value: '6', type: 'number' }, { value: 'c', type: 'action' }, { value: '*', type: 'operator' },
    { value: '1', type: 'number' }, { value: '2', type: 'number' }, { value: '3', type: 'number' }, { value: '%', type: 'operator' }, { value: '-', type: 'operator' },
    { value: '+/-', type: 'action' }, { value: '.', type: 'number' }, { value: '0', type: 'number' }, { value: '=', type: 'action' }, { value: '+', type: 'operator' }
];


const operators = ['+', '-', '*', '/'];

function evaluation(expr: string): number {
    const parts = expr.split(/([+\-])/).filter(p => p.trim() !== '');

    let result = 0;
    let sign = 1;

    for (const part of parts) {
        if (part === '+') {
            sign = 1;
        } else if (part === '-') {
            sign = -1;
        } else {
            const subParts = part.split(/([*\/])/).filter(p => p.trim() !== '');
            let subResult = Number(subParts[0]);

            for (let j = 1; j < subParts.length; j += 2) {
                const op = subParts[j];
                const nextNum = Number(subParts[j + 1]);

                if (op === '*') {
                    subResult *= nextNum;
                } else if (op === '/') {
                    if (nextNum === 0) throw new Error('Division by zero');
                    subResult /= nextNum;
                }
            }

            result += sign * subResult;
        }
    }

    return result;
}

type Prop = {
    handleTransactionUpdate: (val: string) => void;
}
const CalculatorScreen = ({ handleTransactionUpdate }: Prop) => {

    const [amount, setAmount] = useState('');
    const [currentInput, setCurrentInput] = useState('')
    const [justEvaluated, setJustEvaluated] = useState(false);

    const handleKeyPress = (key: string) => {
        const MAX_LENGTH = 12;
        const isOperator = operators.includes(key);
        const lastChar = amount.slice(-1);

        if (key === 'c') {
            setAmount('');
            setCurrentInput('');
            setJustEvaluated(false);
            return;
        }

        if (key === '⌫') {
            if (!amount) return;
            setAmount(prev => prev.slice(0, -1));
            setCurrentInput(prev => prev.slice(0, -1));
            return;
        }

        if (key === '=') {
            if (!amount || isOperator || operators.includes(lastChar)) return;

            try {
                const expression = amount.replace(/x/g, '*');
                const result = evaluation(expression);
                setCurrentInput(expression + ' =');
                setAmount(String(result));
                setJustEvaluated(true);
            } catch {
                setAmount('Error');
                setJustEvaluated(true);
            }
            return;
        }

        if (key === '%') {
            if (!amount) return;

            try {
                const value = evaluation(amount) / 100;
                setAmount(String(value));
                setCurrentInput(String(value));
            } catch {
                setAmount('Error');
            }
            return;
        }

        if (key === '+/-') {
            if (!amount) return;
            const num = Number(amount);
            if (!isNaN(num)) {
                const toggled = num * -1;
                setAmount(String(toggled));
                setCurrentInput(String(toggled));
            }
            return;
        }

        if (justEvaluated) {
            if (isOperator) {
                setAmount(prev => prev + key);
                setCurrentInput(prev => prev + key);
            } else {
                setAmount(key);
                setCurrentInput(key);
            }
            setJustEvaluated(false);
            return;
        }

        if (isOperator) {
            if (!amount) return;

            if (operators.includes(lastChar)) {
                setAmount(prev => prev.slice(0, -1) + key);
                setCurrentInput(prev => prev.slice(0, -1) + key);
                return;
            }
        }

        if (key === '.') {
            const parts = amount.split(/[\+\-\*\/]/);
            const lastNumber = parts[parts.length - 1];

            if (lastNumber.includes('.')) return;

            if (!amount || operators.includes(lastChar)) {
                setAmount(prev => prev + '0.');
                setCurrentInput(prev => prev + '0.');
                return;
            }
        }

        if (amount.length >= MAX_LENGTH) return;

        setAmount(prev => prev + key);
        setCurrentInput(prev => prev + key);
    };


    const handleUseTransaction = () => {
        if (!amount || amount === 'Error' || isNaN(Number(amount))) return;
        handleTransactionUpdate(amount)
    }

    const safeInsets = useSafeAreaInsets()
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingBottom: safeInsets.bottom,
            paddingHorizontal: 16,
            paddingTop: safeInsets.top
        }}>

            <View style={styles.containerPadding}>
                <View>
                    <Text style={styles.liveView}>{currentInput}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{formatAmountUi(amount)}</Text>
                    <Pressable style={styles.button} onPress={handleUseTransaction}>
                        <Text style={styles.buttonText}>
                            Use Result
                        </Text>
                    </Pressable>
                </View>
                <View></View>
                <View style={styles.keypad}>
                    {KEYS.map((key) => (
                        <Pressable
                            key={key.value}
                            onPress={() => handleKeyPress(key.value)}
                            style={[styles.key, key.type === 'operator' ? styles.operatorKey : key.type === 'action' ? styles.actionKey : styles.numberKey]}
                        >
                            <Text style={[styles.keyText, key.type !== 'number' ? { color: '#fff' } : { color: '#000' }]}>
                                {key.value}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        </View>

    )
}


export default CalculatorScreen

const styles = StyleSheet.create({
    amountContainer: {
        backgroundColor: '#f3f4f6',
        padding: 8,
        borderRadius: 8,
        alignItems: "flex-end"
    },
    amount: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    liveView: {
        fontSize: 22,
        textAlign: 'right',
        color: '#3333337e',
        display: 'none'
    },
    button: {
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 12
    },
    buttonText: {
        fontWeight: '700',
        fontSize: 14,
        color: '#0275D8'
    },
    keypad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 8,
        marginVertical: 9,
        backgroundColor: '#f3f4f6',
        padding: 8,
        borderRadius: 8
    },
    key: {
        width: '18%',
        paddingVertical: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 0.2,
        borderRadius: 5,
    },
    numberKey: {
        backgroundColor: '#ffffff',
    },
    operatorKey: {
        backgroundColor: '#0275D8',
    },
    actionKey: {
        backgroundColor: '#e0e0e0',
    },
    keyText: {
        fontSize: 20,
        fontWeight: '400',
    },
    containerPadding: {
        paddingVertical: 10,
    }
});