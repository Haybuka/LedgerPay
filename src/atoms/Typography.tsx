import React from 'react';
import {
    ColorValue,
    StyleProp,
    Text,
    TextProps,
    TextStyle,
} from 'react-native';

export enum AppTextStyle {
    heading1,
    heading2,
    heading3,
    heading4,
    heading5,
    heading6,
    heading7,
    heading8,
    bodyLarge,
    bodyMedium,
    bodySmall,
    bodyTiny,
    bodyLargeBold,
    bodyMediumBold,
    bodySmallBold,
    bodyTinyBold,
    bodyLargeMedium,
    bodyMediumMedium,
    bodySmallMedium,
    bodyTinyMedium,
}

type Props = TextProps & {
    textstyle?: AppTextStyle;
    color?: ColorValue;
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
};

const styles: Record<AppTextStyle, StyleProp<TextStyle>> = {
    [AppTextStyle.heading1]: { fontWeight: '700', fontSize: 72, fontFamily: 'nunito-Bold' },
    [AppTextStyle.heading2]: { fontWeight: '700', fontSize: 56, fontFamily: 'nunito-Bold' },
    [AppTextStyle.heading3]: { fontWeight: '700', fontSize: 40, fontFamily: 'nunito-Bold' },
    [AppTextStyle.heading4]: { fontWeight: '700', fontSize: 32, fontFamily: 'nunito-Bold' },
    [AppTextStyle.heading5]: { fontWeight: '700', fontSize: 28, fontFamily: 'nunito-Bold' },
    [AppTextStyle.heading6]: { fontWeight: '700', fontSize: 24, fontFamily: 'nunito-Bold' },
    [AppTextStyle.heading7]: { fontWeight: '700', fontSize: 20, fontFamily: 'nunito-Bold' },
    [AppTextStyle.heading8]: { fontWeight: '700', fontSize: 16, fontFamily: 'nunito-Bold' },
    [AppTextStyle.bodyLarge]: { fontSize: 16, fontFamily: 'nunito' },
    [AppTextStyle.bodyMedium]: { fontSize: 14 },
    [AppTextStyle.bodySmall]: { fontSize: 12, fontFamily: 'nunito' },
    [AppTextStyle.bodyTiny]: { fontSize: 11, fontFamily: 'nunito' },
    [AppTextStyle.bodyLargeBold]: { fontSize: 16, fontWeight: '600', fontFamily: 'nunito-Bold' },
    [AppTextStyle.bodyMediumBold]: { fontSize: 14, fontWeight: '600', fontFamily: 'nunito-Bold' },
    [AppTextStyle.bodySmallBold]: { fontSize: 12, fontWeight: '600', fontFamily: 'nunito-Bold' },
    [AppTextStyle.bodyTinyBold]: { fontSize: 11, fontWeight: '600', fontFamily: 'nunito-Bold' },
    [AppTextStyle.bodyLargeMedium]: { fontSize: 16, fontWeight: '500', fontFamily: 'nunito-SemiBold' },
    [AppTextStyle.bodyMediumMedium]: { fontSize: 14, fontWeight: '500', fontFamily: 'nunito-SemiBold' },
    [AppTextStyle.bodySmallMedium]: { fontSize: 12, fontWeight: '500', fontFamily: 'nunito-SemiBold' },
    [AppTextStyle.bodyTinyMedium]: { fontSize: 11, fontWeight: '500', fontFamily: 'nunito-light' },
};

export const Typography = ({
    textstyle = AppTextStyle.bodyMedium,
    style,
    color = 'grey900',
    textAlign,
    ...props
}: Props) => {
    return (
        <Text style={[styles[textstyle], { color, textAlign, fontFamily: 'nunito-old' }, style]} {...props} />
    );
};