import { Typography } from '@/atoms';
import { COLORS } from '@/theme/colors';
import React from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';

type Props = PressableProps & {
    isSelected: boolean;
    value: string
}
const Pill = ({ isSelected, value, ...rest }: Props) => {
    return (
        <Pressable
            {...rest}
            style={{
                paddingVertical: 4,
                paddingHorizontal: 16,
                borderRadius: 10,
                backgroundColor: isSelected ? COLORS.ledgerBlue : COLORS.grey50,
                alignItems: 'center',
            }}
        >
            <Typography color={isSelected ? COLORS.white : COLORS.white}>
                {value?.charAt(0)?.toUpperCase() + value?.slice(1)}
            </Typography>
        </Pressable>
    )
}

export default Pill

const styles = StyleSheet.create({})