import { TabType } from '@/app/(tabs)/transaction';
import { Pill } from '@/molecules';
import React from 'react';
import { StyleSheet, View } from 'react-native';


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
                <Pill
                    key={tab}
                    onPress={() => handleSelectedTab(tab)}
                    isSelected={selectedTab === tab}
                    value={tab}
                />
            ))}
        </View>
    )
}

export default TransactionTabPill

const styles = StyleSheet.create({})