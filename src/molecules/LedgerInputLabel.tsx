import LedgerInput from '@/atoms/Input';
import { Typography } from '@/atoms/Typography';
import React from 'react';
import { StyleSheet, TextInputProps, View } from 'react-native';

type Props = {
  label?: string;
  value: string;
  onChange: (text: string) => void;
  inputProps?: TextInputProps;
};

const LedgerInputLabel = ({
  label,
  value,
  onChange,
  inputProps,
}: Props) => {
  return (
    <View style={styles.inputInner}>
      {label ? <Typography>{label}</Typography> : null}

      <LedgerInput
        value={value}
        onChange={onChange}
        inputProps={inputProps}
        
      />
    </View>
  );
};

export default LedgerInputLabel;

const styles = StyleSheet.create({
  inputInner: {
    position: 'relative',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});