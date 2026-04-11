import { Typography } from '@/atoms'
import { TransactionItem, TransactionSearch, TransactionSheetUi, TransactionTabPill } from '@/components/transaction'
import { BottomSheetUsage, Header } from '@/organisms'
import { NetworkContext } from '@/providers/NetworkContext'
import { Screen } from '@/templates'
import { TransactionItemType } from '@/types/transactionTypes'
import { transactionsData } from '@/utils/appData'
import BottomSheet from '@gorhom/bottom-sheet'
import React, { useContext, useRef, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, View } from 'react-native'

export type TabType = 'all' | 'credit' | 'debit';
const tabs: TabType[] = ['all', 'credit', 'debit'];

const Transaction = () => {
    const [transactions, setTransactions] = useState<TransactionItemType[]>(transactionsData as TransactionItemType[])
    const [search, setSearch] = useState('');
    const [selectedTab, setSelectedTab] = useState<'all' | 'debit' | 'credit'>('all');
    const [isLoading, setIsLoading] = useState(false);
    const sheetRef = useRef<BottomSheet>(null);
    const [selectedItem, setSelectedItem] = useState<TransactionItemType>({} as TransactionItemType);

    const updateTabSelect = (item: TabType) => {
        setSelectedTab(item)
    }

    const { isOnline, networkConnectionType } = useContext(NetworkContext)

    const checkNetAvailable = () => {
        setIsLoading(true);
        try {
            Alert.alert(
                `${networkConnectionType} Network Status`,
                isOnline ? 'You are online' : 'No internet connection',
                [{ text: 'OK' }],
                { cancelable: true }
            );
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    function onRefresh() {
        checkNetAvailable()
    }


    const filteredTransactions = transactions.filter((item) => {


        const query = search.toLowerCase();

        // Check if the search match items
        const matchesSearch =
            item.title.toLowerCase().includes(query) ||
            item.type.toLowerCase().includes(query) ||
            item.amount.toString().includes(query);

        // Check tab filter
        const matchesTab = selectedTab === 'all' ? true : item.type === selectedTab;

        return matchesSearch && matchesTab;
    });

    const handleSelectedItem = (item: TransactionItemType) => {
        setSelectedItem(item);
        sheetRef.current?.snapToIndex(0);
    }
    const handledSearchChange = (text: string) => {
        setSearch(text);
    }
    return (
        <Screen>
            <Header title='Transactions' showIconLeft={true} />

            <View style={{ paddingVertical: 10,}}>
                <TransactionSearch search={search} handleSearch={handledSearchChange} />

                <TransactionTabPill
                    tabs={tabs}
                    selectedTab={selectedTab}
                    updateSelectedTab={updateTabSelect}
                />
            </View>
            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <ActivityIndicator size={'large'} />
                </View>) : (

                <>

                    <FlatList
                        data={filteredTransactions}
                        contentContainerStyle={{ marginBottom: 10 }}
                        initialNumToRender={5}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        refreshing={isLoading}
                        onRefresh={onRefresh}
                        renderItem={({ item }) => <TransactionItem item={item} handleSelected={handleSelectedItem} />}
                        ListEmptyComponent={() => (
                            <View style={{ padding: 20, alignItems: 'center', }}>
                                <Typography style={{ marginTop: 10, fontSize: 16, color: '#999' }}>
                                    No transactions found
                                </Typography>
                            </View>
                        )}
                    />


                </>

            )}
            <BottomSheetUsage ref={sheetRef}>
                <TransactionSheetUi item={selectedItem} />
            </BottomSheetUsage>
        </Screen>
    )
}

export default Transaction