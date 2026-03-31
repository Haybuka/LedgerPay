import { TabType } from '@/app/transaction';
import { COLORS } from '@/theme/colors';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Typography } from '../Typography';


type Props = {
    tabs: TabType[];
    selectedTab: TabType;
    updateSelectedTab: (item: TabType) => void;
}
const TransactionTabPill = ({ tabs, selectedTab, updateSelectedTab }: Props) => {

    const handleSelectedTab = (item: TabType) => {
        updateSelectedTab(item)
    }
    return (
        <View style={{ flexDirection: 'row', gap: 20, marginTop: 20 }}>
            {tabs.map((tab) => (
                <Pressable
                    key={tab}
                    onPress={() => handleSelectedTab(tab)}
                    style={{
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
    )
}

export default TransactionTabPill

const styles = StyleSheet.create({})