import Header from '@/components/CustomHeader'
import TransactionItem from '@/components/transaction/transactionItem'
import { Typography } from '@/components/Typography'
import { COLORS } from '@/theme/colors'
import { transactionsData } from '@/utils/appData'
import React, { useRef, useState } from 'react'
import { FlatList, Pressable, TextInput, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as SVG from '../../assets/icons'

type TransactionItemType = {
  id: string;
  type: 'debit' | 'credit';
  title: string;
  time: string;
  amount: number;
  icon: string;
}

const tabs = ['all', 'credit', 'debit']
const Transaction = () => {
  const safeInsets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const [transactions, setTransactions] = useState<TransactionItemType[]>(transactionsData as TransactionItemType[])
  const [search, setSearch] = useState('');
  const [selectedTab, setSelectedTab] = useState<'all' | 'debit' | 'credit'>('all');
  const onSearchIconPress = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // focus the input when search icon is pressed
    }
  };

  const filteredTransactions = transactions.filter((item) => {
    const query = search.toLowerCase();

    // Check search match
    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query) ||
      item.amount.toString().includes(query);

    // Check tab filter
    const matchesTab = selectedTab === 'all' ? true : item.type === selectedTab;

    return matchesSearch && matchesTab;
  });
  return (
    <View style={{ flex: 1 }}>
      <Header title='Transactions' showIconLeft={true} />

      <View
        style={{
          flex: 1,
          paddingBottom: safeInsets.bottom,
          paddingHorizontal: 16,
        }}
      >
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
            {['all', 'credit', 'debit'].map((tab) => (
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

                <Typography color={selectedTab === tab ? COLORS.white : COLORS.ledgerBlue}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
          renderItem={({ item }) => <TransactionItem item={item} />}
          ListEmptyComponent={() => (
            <View style={{ padding: 20, alignItems: 'center', }}>
              <Typography style={{ marginTop: 10, fontSize: 16, color: '#999' }}>
                No transactions found
              </Typography>
            </View>
          )}
        />
      </View>

    </View>
  )
}

export default Transaction