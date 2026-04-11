
import React from 'react';

import Typography, { AppTextStyle } from '@/atoms/Typography';
import { COLORS } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ContactType } from './types';




type BeneficiaryContactitemProp = {
    index: number;
    item: ContactType;
    handleItemSelect: (item: ContactType) => void;
    deleteItem?: boolean;
}
const BeneficiaryContactitem = ({ deleteItem = true, index, item, handleItemSelect, }: BeneficiaryContactitemProp) => {


    const router = useRouter()
    const handleNextScreen = () => {
        router.push({
            pathname: '/sendMoney',
            params: {
                item: JSON.stringify(item)
            },
        });
    }

    return (

        <TouchableOpacity
            activeOpacity={0.4}
            style={styles.container}
            onPress={handleNextScreen}
        >
            {/* Avatar Heading*/}
            <View
                style={styles.avatar}

            >
                <Typography textstyle={AppTextStyle.bodyMedium} color={COLORS.white}>
                    {item?.name
                        .split(' ')
                        .slice(0, 2)
                        .map(n => n[0].toUpperCase())
                        .join('')}
                </Typography>
            </View>

            {/* Info */}
            <View style={styles.rhs}>
                <View >
                    <Typography textstyle={AppTextStyle.bodyMedium} color={COLORS.ledgerBlue}>
                        {item.name}
                    </Typography>
                    <Typography textstyle={AppTextStyle.bodySmall} color={COLORS.ledgerBlue}>
                        {item.bank} • {item.accountNumber}
                    </Typography>
                </View>
                {deleteItem && (
                    <Pressable onPress={() => handleItemSelect(item)}>
                        <Ionicons name="trash" size={24} color={COLORS.ledgerBlue} />
                    </Pressable>
                )}
            </View>
        </TouchableOpacity>


    )
}

export default BeneficiaryContactitem;

const styles = StyleSheet.create({
    container: {
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center', gap: 12
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.ledgerBlue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rhs: {
        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
    }
})