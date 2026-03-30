import Header from '@/components/CustomHeader'
import Screen from '@/components/Screen'
import BottomSheetUsage from '@/components/SheetModal'
import TransactionItem from '@/components/transaction/TransactionItem'
import TransactionSearch from '@/components/transaction/TransactionSearch'
import TransactionSheetUi from '@/components/transaction/TransactionSheetUi'
import { Typography } from '@/components/Typography'
import { NetworkContext } from '@/providers/NetworkContext'
import { COLORS } from '@/theme/colors'
import { TransactionItemType } from '@/types/transactionTypes'
import { transactionsData } from '@/utils/appData'
import BottomSheet from '@gorhom/bottom-sheet'
import React, { useContext, useRef, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'



const tabs = ['all', 'credit', 'debit']
const Transaction = () => {
    const safeInsets = useSafeAreaInsets();
    const [transactions, setTransactions] = useState<TransactionItemType[]>(transactionsData as TransactionItemType[])
    const [search, setSearch] = useState('');
    const [selectedTab, setSelectedTab] = useState<'all' | 'debit' | 'credit'>('all');
    const [isLoading, setIsLoading] = useState(false);
    const sheetRef = useRef<BottomSheet>(null);
    const [selectedItem, setSelectedItem] = useState<TransactionItemType>({} as TransactionItemType);

    const { isOnline, isReachable, networkConnectionType } = useContext(NetworkContext)

    const checkNetAvailable = async () => {
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

            {isLoading ? (<ActivityIndicator />) : (

                <>
                    <View style={{ paddingVertical: 10, }}>
                        <TransactionSearch search={search} handleSearch={handledSearchChange} />
                        <View style={{ flexDirection: 'row', gap: 20, marginTop: 20 }}>
                            {tabs.map((tab) => (
                                <Pressable
                                    key={tab}
                                    onPress={() => setSelectedTab(tab as 'all' | 'credit' | 'debit')}
                                    style={{
                                        // flex: 1,
                                        paddingVertical: 4,
                                        paddingHorizontal: 16,
                                        borderRadius: 10,
                                        backgroundColor: selectedTab === tab ? COLORS.ledgerBlue : COLORS.grey50,
                                        alignItems: 'center',
                                    }}
                                >

                                    <Typography color={selectedTab === tab ? COLORS.white : COLORS.white}>
                                        {tab?.charAt(0)?.toUpperCase() + tab?.slice(1)}
                                    </Typography>
                                </Pressable>
                            ))}
                        </View>
                    </View>
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

                    <BottomSheetUsage ref={sheetRef}>
                        <TransactionSheetUi item={selectedItem} />
                    </BottomSheetUsage>
                </>
            )}
        </Screen>
    )
}

export default Transaction