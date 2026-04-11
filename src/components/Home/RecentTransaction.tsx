import Typography, { AppTextStyle } from "@/atoms/Typography"
import { COLORS } from "@/theme/colors"
import { TransactionItemType } from '@/types/transactionTypes'
import { transactionsData } from '@/utils/appData'
import { useRouter } from "expo-router"
import React, { useState } from 'react'
import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import { TransactionItem } from "../transaction"

const RecentTransaction = () => {
    const router = useRouter();
    const [transactions, setTransactions] = useState<TransactionItemType[]>(transactionsData as TransactionItemType[])

    const handleNavigate = () => {
        router.push('/transaction');
    }

    const handleSelectedItem = (item: TransactionItemType) => {

    }
    return (
        <FlatList
            data={transactions.slice(0, 5)}
            contentContainerStyle={{ marginBottom: 10 }}
            ListHeaderComponent={() => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <Typography color={COLORS.ledgerBlue} style={{ marginBottom: 10 }} textstyle={AppTextStyle.bodyMedium}>Recent Transactions</Typography>
                    <Pressable onPress={handleNavigate}>
                        <Typography color={COLORS.ledgerBlue} style={{ marginBottom: 10, textDecorationLine: 'underline' }} textstyle={AppTextStyle.bodyMedium}>See more</Typography>
                    </Pressable>
                </View>
            )}
            initialNumToRender={3}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <TransactionItem item={item} handleSelected={handleSelectedItem} />}
            ListEmptyComponent={() => (
                <View style={{ padding: 20, alignItems: 'center', }}>
                    <Typography style={{ marginTop: 10, fontSize: 16, color: '#999' }}>
                        No transactions found
                    </Typography>
                </View>
            )}
        />
    )
}

export default RecentTransaction

const styles = StyleSheet.create({})