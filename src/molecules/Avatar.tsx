import AvatarBase from '@/atoms/AvatarBase';
import { COLORS } from '@/theme/colors';
import React from 'react';
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

type Props = {
    icon?: React.ReactElement;
    iconStyles?: StyleProp<ViewStyle>;
    containerBg: string;
    image?: string;
    size: number;
    initials ?: string;
}

const Avatar = ({ icon, iconStyles, containerBg, image, size, initials }: Props) => {

    return (
        <AvatarBase size={size} background={containerBg}>
            <>
                {image ? (
                    <Image
                        source={{ uri: image }}
                        style={[styles.image, {borderRadius : size /2}]}
                    />
                ) : (
                    <Text >
                        {initials ?? ''}
                    </Text>
                )}

                {icon && (
                    <View
                        style={[styles.icon, iconStyles]}
                    >
                        {icon}
                    </View>
                )}
            </>
        </AvatarBase>
    )
}

export default Avatar

const styles = StyleSheet.create({
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
    },
    image: {
    width: '100%',
    height: '100%',
  },
})