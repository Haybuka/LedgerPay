import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
// import { Stack } from "expo-router";
// import { StatusBar } from 'expo-status-bar';

// export const unstable_settings = {
//   anchor: '(tabs)',
// };

// export default function RootLayout() {

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <ThemeProvider value={DefaultTheme}>

//         <Stack>
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//           <Stack.Screen name="modal"
//             options={{
//               presentation: "modal",       // slide-up by default on iOS
//               headerShown: false,
//               animation: "slide_from_bottom" // forces slide-up
//             }}
//           />
//         </Stack>
//         <StatusBar style="auto" backgroundColor='transparent' />
//       </ThemeProvider>
//     </GestureHandlerRootView>


//   );
// }

import { AppProvider } from '@/providers/AppContext';
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
                    <AppProvider>
                        <NetworkBanner />
                        <ThemeProvider value={DefaultTheme}>
                            <Stack screenOptions={{ headerShown: false }} />
                        </ThemeProvider>
                    </AppProvider>
                </NetworkProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
