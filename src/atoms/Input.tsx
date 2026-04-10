import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

type LedgerInputProps = {
    value: string;
    onChange: (text: string) => void;
    inputProps?: TextInputProps;
};

const LedgerInput: React.FC<LedgerInputProps> = ({
    value, onChange, inputProps
}) => {
    return (

        <TextInput
            value={value}
            onChangeText={onChange}
            style={styles.input}
            {...inputProps}
        />

    );
};

export default LedgerInput;

const styles = StyleSheet.create({
    input: {

        borderRadius: 10,
        paddingHorizontal: 12,
        paddingRight: 40, // space for the icon
        paddingVertical: 10,
        flex: 1,
    },
});