import { COLORS } from '@/theme/colors';
import React from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { AppTextStyle, Typography } from './Typography';

// Define types for the props
type SwitchOptionProps = {
    label: string;
    value: boolean;
    onToggle: (value: boolean) => void;
}

const SwitchOption: React.FC<SwitchOptionProps> = ({ label, value, onToggle }) => {
    return (
        <View style={styles.container}>
            <Typography textstyle={AppTextStyle.bodyLarge} >{label}</Typography >
            <Switch value={value}
                onValueChange={onToggle} thumbColor={COLORS.ledgerBlue}
                trackColor={{ false: COLORS.white50, true: COLORS.grey50 }} />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
    },
});

export default SwitchOption;