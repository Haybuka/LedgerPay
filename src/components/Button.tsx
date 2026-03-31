import { COLORS } from '@/theme/colors';
import React from 'react';
import { ActivityIndicator, Pressable, PressableProps, StyleSheet, View } from 'react-native';
import { Typography } from './Typography';

type Props = PressableProps & {
  label: string;
  icon?: React.ReactNode;
  bgColor?: string;
  loading?: boolean;
};

const Button = ({ label, icon, bgColor, style, loading,disabled, ...rest }: Props) => {
  return (
    <>
      {loading ? (
        <ActivityIndicator size={'large'} color={COLORS.ledgerBlue} />
      ): (
        <Pressable  {...rest}>
      <View
        style={[
          styles.btnContainer,
          { 
            backgroundColor: bgColor ? bgColor : COLORS.ledgerBlue,
            opacity : disabled ? 0.4 : 1
           },
  
        ]}
      >
        {icon}
        <Typography color={COLORS.white} >{label}</Typography>
      </View>
    </Pressable >
    )}
    </>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: COLORS.ledgerBlue,
  },
});