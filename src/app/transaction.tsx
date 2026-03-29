import Header from '@/components/CustomHeader'
import Screen from '@/components/Screen'
import BottomSheetUsage from '@/components/SheetModal'
import TransactionItem from '@/components/transaction/transactionItem'
import TransactionSheetUi from '@/components/transaction/transactionSheetUi'
import { Typography } from '@/components/Typography'
import { COLORS } from '@/theme/colors'
import { TransactionItemType } from '@/types/transactionTypes'
import { transactionsData } from '@/utils/appData'
import BottomSheet from '@gorhom/bottom-sheet'
import React, { useRef, useState } from 'react'
import { FlatList, Pressable, TextInput, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as SVG from '../assets/icons'



const tabs = ['all', 'credit', 'debit']
const Transaction = () => {
  const safeInsets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const [transactions, setTransactions] = useState<TransactionItemType[]>(transactionsData as TransactionItemType[])
  const [search, setSearch] = useState('');
  const [selectedTab, setSelectedTab] = useState<'all' | 'debit' | 'credit'>('all');

  const sheetRef = useRef<BottomSheet>(null);
  const [selectedItem, setSelectedItem] = useState<TransactionItemType>({} as TransactionItemType);
  const onSearchIconPress = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // focus the input when search icon is pressed
    }
  };

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
  return (
    <Screen>
      <Header title='Transactions' showIconLeft={true} />


      <View style={{ paddingVertical: 10, }}>
        <View style={{ position: 'relative', justifyContent: 'center' }}>
          <TextInput
            ref={inputRef}
            placeholder="Search by name, bank, or account number"
            value={search}
            onChangeText={setSearch}
            style={{
              backgroundColor: '#F6F8FA',
              borderRadius: 10,
              paddingHorizontal: 12,
              paddingRight: 40, // space for the icon
              paddingVertical: 10,
            }}
          />

          <Pressable
            onPress={onSearchIconPress}
            style={{
              position: 'absolute',
              right: 12,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SVG.Search height={18} width={18} />
          </Pressable>
        </View>
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
    </Screen>
  )
}

export default Transaction