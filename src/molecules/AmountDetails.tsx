
import Typography, { AppTextStyle } from '@/atoms/Typography';
import { COLORS } from '@/theme/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
    value: string;
    label: string;
}
const AmountDetails = ({ value, label }: Props) => {
    return (
        <View style={styles.container}>
            <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.bodyMedium}>{label}</Typography>
            <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.bodyMedium}>{value}</Typography>
        </View>
    )
}

export default AmountDetails

const styles = StyleSheet.create({
    container:
        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14,borderBottomWidth:1 , paddingVertical:4 , borderBottomColor : COLORS.grey300 },
    


})