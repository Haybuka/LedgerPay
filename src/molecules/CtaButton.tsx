import { COLORS } from '@/theme/colors';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Typography } from '../atoms/Typography';


type Props = {
    label: string;
    icon?: React.ReactNode;
    onPress?: () => void;
    bgColor?: string;
}
const CtaButton = ({ label, icon, onPress,bgColor }: Props) => {
    return (
        <Pressable onPress={onPress}>
            <View style={[styles.btnContainer, { backgroundColor: bgColor ? bgColor : COLORS.ledgerBlue }]}>
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
        // backgroundColor: '#0072CE',
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