
import { COLORS } from '@/theme/colors';
import { TransactionItemType } from '@/types/transactionTypes';
import { formatCurrency } from '@/utils/currencyFormatter';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as SVG from '../../assets/icons';
import { AppTextStyle, Typography } from '../Typography';


type Props = {
    item: TransactionItemType;
    handleSelected: (item: TransactionItemType) => void
};

const TransactionItem: React.FC<Props> = ({ item, handleSelected }) => {

    const isDebit = item.type === 'debit';

    const iconMap = {
        debit: <SVG.CheckLight width={8} height={8} />,
        credit: <SVG.CheckStroke width={10} height={10} />,
    };

    const onButtonPress = () => {
        handleSelected(item);
    }
    return (
        <>
            <TouchableOpacity activeOpacity={0.4} style={styles.container} onPress={onButtonPress}>
                <View style={styles.lhs}>
                    <View
                        style={styles.avatar}
                    >
                        <View
                            style={[styles.icon, { backgroundColor: isDebit ? COLORS.oxblood : COLORS.green500 }]}
                        >
                            {iconMap[item.type]}
                        </View>
                    </View>

                    <View>
                        <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.bodyMediumBold} >
                            {item.title}
                        </Typography>
                        <Typography textstyle={AppTextStyle.bodySmall} color={COLORS.grey50}>
                            {item.time}
                        </Typography>
                    </View>
                </View>

                <View >
                    <Typography
                        textstyle={AppTextStyle.bodyMedium}
                        color={isDebit ? COLORS.oxblood : COLORS.green500}
                    >

                        {` $ ${formatCurrency(item.amount)}`}
                    </Typography>
                </View>

            </TouchableOpacity>

        </>
    );
};
export default TransactionItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 20,
        alignItems: 'flex-start',
        // backgroundColor : 'blue'
    },
    lhs: {
        flex: 1,
        flexDirection: 'row',
        gap: 10
    },
    avatar: {
        height: 42,
        width: 42,
        borderRadius: 25,
        position: "relative",
        backgroundColor: COLORS.grey50
    },
    icon: {
        position: "absolute",
        bottom: -6,
        right: -6,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        padding: 6,
        borderRadius: 100,
        borderColor: COLORS.white,
        width: 23,
        height: 23,
    }
})