import { COLORS } from '@/theme/colors';
import React from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import Typography, { AppTextStyle } from '../atoms/Typography';


// Define types for the props
type SwitchOptionProps = {
    label: string;
    value: boolean;
    onToggle: (value: boolean) => void;
    icon : React.ReactNode;
}

const SwitchOption: React.FC<SwitchOptionProps> = ({ label, value, onToggle, icon }) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}> 
                {icon}
                <Typography textstyle={AppTextStyle.bodyLarge} >{label}</Typography >
            </View>
            <Switch value={value}
                onValueChange={onToggle} thumbColor={COLORS.white}
                trackColor={{ false: COLORS.grey50, true: COLORS.ledgerBlue }} />

        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 14,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
    },
    iconContainer : {flexDirection : 'row', gap : 8, alignItems : 'center', flex : 1}
});

export default SwitchOption;