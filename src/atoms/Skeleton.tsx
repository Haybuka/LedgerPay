
import { COLORS } from '@/theme/colors';
import React from 'react';
import { View, ViewStyle } from 'react-native';

type Variant = 'rect' | 'circle' | 'text';

type LedgerSkeletonProps = {
    height?: number;
    width?: number;
    variant?: Variant;
    style?: ViewStyle;
};

const LedgerSkeleton = ({
    height = 10,
    width = 20,
    variant = 'rect',
    style,
}: LedgerSkeletonProps) => {
    const isCircle = variant === 'circle';

    return (
        <View
            style={[{ height, width, borderRadius: isCircle ? 999 : 8, backgroundColor: COLORS.grey600 }, style]}
        />
    );
};

export default LedgerSkeleton;