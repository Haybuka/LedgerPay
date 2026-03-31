import { Typography } from '@/components/Typography'
import { COLORS } from '@/theme/colors'
import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'

type FormInputProps<T extends FieldValues> = {
    control: Control<T>
    name: Path<T>
    label?: string
    rules?: object
} & TextInputProps

export function FormInput<T extends FieldValues>({
    control,
    name,
    label,
    rules,
    ...inputProps
}: FormInputProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View style={styles.inputContainer}>
                    <View style={styles.container}>
                        <View style={styles.inputInner}>
                            {label && <Typography>{label}</Typography>}


                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                style={styles.input}
                                {...inputProps}
                            />

                        </View>
                    </View>
                  
                    {error && (
                        <Typography style={styles.error}>
                            {error.message}
                        </Typography>
                    )}
                </View>
            )}
        />
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 14
    },
     container: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: COLORS.grey50,
        borderRadius: 14,
        
    },
    input: {


        borderRadius: 10,
        paddingHorizontal: 12,
        paddingRight: 40, // space for the icon
        paddingVertical: 10,
        flex: 1,

    },
    inputInner: {
        position: "relative",
        justifyContent: "center",
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    error: {
        color: COLORS.oxblood,
        marginTop: 4,
    },
})