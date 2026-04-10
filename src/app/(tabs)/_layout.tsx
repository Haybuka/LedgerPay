import { Stack } from 'expo-router';
import React from 'react';


export default function HomeLayout() {

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="beneficiary" options={{ headerShown: false }} />
            <Stack.Screen name="sendMoney" options={{ headerShown: false }} />

        </Stack>
    );
}