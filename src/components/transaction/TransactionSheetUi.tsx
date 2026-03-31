import { TransactionItemType } from '@/types/transactionTypes';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    item: TransactionItemType;
}
const TransactionSheetUi = ({ item }: Props) => {

    const isDebit = item?.type === 'debit';
    return (
        <View>

            <Text style={styles.title}>{item.title}</Text>

            <Text
                style={[
                    styles.amount,
                    { color: item?.type === 'debit' ? '#E53935' : '#2E7D32' },
                ]}
            >
                {item?.type === 'debit' ? '-' : '+'}₦
                {item?.amount?.toLocaleString()}
            </Text>

            <View style={styles.divider} />

            <View style={styles.row}>
                <Text style={styles.label}>Transaction Type</Text>
                <Text style={styles.value}>{item?.type?.toUpperCase()}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Date & Time</Text>
                <Text style={styles.value}>{item?.time}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Reference ID</Text>
                <Text style={styles.value}>{item?.id}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Note</Text>
                <Text style={styles.value}>{item?.note}</Text>
            </View>
        </View>
    )
}

export default TransactionSheetUi

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    amount: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: '#757575',
    },
    value: {
        fontSize: 14,
        fontWeight: '500',
    },
});