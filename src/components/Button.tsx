import { COLORS } from '@/theme/colors';
import React from 'react';
import { Pressable, PressableProps, StyleSheet, View } from 'react-native';
import { Typography } from './Typography';

type Props = PressableProps & {
  label: string;
  icon?: React.ReactNode;
  bgColor?: string;
};

const Button = ({ label, icon, bgColor, style, ...rest }: Props) => {
  return (
    <Pressable {...rest}>
      <View
        style={[
          styles.btnContainer,
          { backgroundColor: bgColor ? bgColor : COLORS.ledgerBlue },
      
        ]}
      >
        {icon}
        <Typography color={COLORS.white}>{label}</Typography>
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.ledgerBlue,
  },
});