import { COLORS } from '@/theme/colors';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Typography } from './Typography';


type Props = {
    label: string;
    icon?: React.ReactNode;
    onPress?: () => void;
}
const CtaButton = ({ label, icon, onPress }: Props) => {
    return (
        <Pressable onPress={onPress}>
            <View style={styles.btnContainer}>
                {icon}
            </View>
            <Typography textAlign='center' color={COLORS.ledgerBlue}>{label} </Typography>
        </Pressable>
    )
}

export default CtaButton;

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.ledgerBlue,
        gap: 10,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginBottom: 6,
        height: 50,
        width: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
})