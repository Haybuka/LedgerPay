import React, { forwardRef } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

type LedgerInputProps = TextInputProps;

const LedgerInput = forwardRef<TextInput, LedgerInputProps>(
  ({ style, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        style={[styles.input, style]}
        {...props}
      />
    );
  }
);

export default LedgerInput;

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingRight: 40,
    paddingVertical: 10,
    flex : 1,
  },
});