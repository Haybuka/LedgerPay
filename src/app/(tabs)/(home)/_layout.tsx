import { Stack } from 'expo-router';
import React from 'react';


export default function HomeLayout() {

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index"  />
            <Stack.Screen name="beneficiary"  />
            <Stack.Screen name="sendMoney"  />
            <Stack.Screen name="receipt"  />
            <Stack.Screen name="amountInput"  />
        </Stack>
    );
}