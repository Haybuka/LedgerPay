import { AvatarBase, Typography } from '@/atoms';
import { COLORS } from '@/theme/colors';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';



type Props = {
    label: string;
    icon: React.ReactElement;
    onPress?: () => void;
    bgColor?: string;
}
const CtaButton = ({ label, icon, onPress, bgColor }: Props) => {
    return (
        <Pressable onPress={onPress} style={{gap:6}}>
            {/* <View style={[styles.btnContainer, { backgroundColor: bgColor ? bgColor : COLORS.ledgerBlue }]}>
                {icon}
            </View> */}
            <AvatarBase size={50} background={bgColor ? bgColor : COLORS.ledgerBlue}>
                {icon}
            </AvatarBase>
            <Typography textAlign='center' color={COLORS.ledgerBlue}>{label} </Typography>
        </Pressable>
    )
}

export default CtaButton;

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
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