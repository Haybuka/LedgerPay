import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { Stack } from "expo-router";
// import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

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

import { COLORS } from '@/theme/colors';
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from 'expo-router';
import React from 'react';
import { useWindowDimensions, View } from "react-native";

export default function TabLayout() {
    const { width: screenWidth, height } = useWindowDimensions();

    // Width of the tab bar itself
    const tabBarWidth = 150; // adjust based on number of tabs + spacing
    const numberOfTabs = 3;
    const tabWidth = tabBarWidth / numberOfTabs;
    const iconSize = 28;
    return (
        <GestureHandlerRootView style={{ flex: 1 , backgroundColor : COLORS.white}}>
            <ThemeProvider value={DefaultTheme}>
                <Tabs

                    screenOptions={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarActiveTintColor: "#1E293B",
                        // tabBarActiveBackgroundColor : 'purple',
                        tabBarBackground: () => <View style={{ height: 200, flex: 1 }}></View>,
                        tabBarStyle: {
                            // position: "absolute",
                            bottom: 20, // float above bottom
                            alignSelf: "center",
                            width: tabBarWidth,
                            height: iconSize + 16,
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: 30,
                            flexDirection: "row",
                            paddingHorizontal: 0,
                        },
                        tabBarItemStyle: {
                            width: tabWidth,
                            justifyContent: "center",
                            alignItems: "center",
                        },
                    }}
                >
                    <Tabs.Screen
                        name='(home)'

                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons size={size} name='home-outline' color={color} />
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name='transaction'
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons size={size} name='menu-outline' color={color} />
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name="settings"
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons size={size} name='settings-outline' color={color} />
                            ),
                        }}
                    />
                </Tabs>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
}
