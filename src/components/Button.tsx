import { COLORS } from '@/theme/colors';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Typography } from './Typography';


type Props = {
  label : string;
  icon? : React.ReactNode
}
const Button = ({ label, icon }: Props) => {
  return (
    <Pressable>
      <View style={styles.btnContainer}>
        {icon}
        <Typography color={COLORS.white}>{label} </Typography>
      </View>
    </Pressable>
  )
}

export default Button;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    backgroundColor: 'red',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  }
})