import { LedgerInput } from '@/atoms';
import React, { useRef } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import * as SVG from '../../assets/icons';

type Prop = {
    search: string;
    handleSearch: (text: string) => void;
}
const TransactionSearch = ({ search, handleSearch }: Prop) => {

    const inputRef = useRef<TextInput>(null);
    const onSearchIconPress = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };


    return (
        <View style={{ position: 'relative', justifyContent: 'center',backgroundColor: '#F6F8FA',padding:10, borderRadius: 10, }}>
            <LedgerInput
                ref={inputRef}
                placeholder="Search by name, bank, or account number"
                value={search}
                onChangeText={handleSearch}
                style={{
                  
                    borderRadius: 10,
                    paddingHorizontal: 12,
                    paddingRight: 40, // space for the icon
                    paddingVertical: 10,
                    flex: 1,
                    height: 300
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
    )
}

export default TransactionSearch

const styles = StyleSheet.create({})