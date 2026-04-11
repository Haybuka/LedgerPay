import { COLORS } from '@/theme/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
    size ?: number;
    background?: string;
    children: React.ReactElement;
}

const AvatarBase = ({ size = 42, background = COLORS.grey50,  children }: Props) => {

    const defaultAvatar = {
        width : size,
        height : size,
        borderRadius: size / 2,
        backgroundColor: background,
    }

    const getInitials = () => {

    }
    return (
        <View
            style={[styles.avatar, defaultAvatar]}

        >
            {children}
        </View>
    )
}

export default AvatarBase

const styles = StyleSheet.create({
    avatar: {
        position: "relative",
        justifyContent: 'center',
        alignItems: 'center',
    },
})