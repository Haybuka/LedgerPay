import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { AppProvider } from '@/providers/AppContext';
import { AuthProvider } from '@/providers/AuthContext';
import { NetworkProvider } from '@/providers/NetworkContext';
import { NetworkBanner } from '@/templates';
import { COLORS } from '@/theme/colors';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function TabLayout() {

    const [loaded] = useFonts({
        nunito: require('../assets/fonts/Nunito-Regular.ttf'),
        'nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
        'nunito-Semibold': require('../assets/fonts/Nunito-SemiBold.ttf'),
        'nunito-light': require('../assets/fonts/Nunito-Light.ttf'),
    });


    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <SafeAreaProvider>
                <NetworkProvider>
                    <AuthProvider>
                        <AppProvider>
                            <NetworkBanner />
                            <ThemeProvider value={DefaultTheme}>
                                <Stack screenOptions={{ headerShown: false }} />
                            </ThemeProvider>
                        </AppProvider>
                    </AuthProvider>
                </NetworkProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
