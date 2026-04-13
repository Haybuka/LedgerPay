import { AppProvider } from '@/providers/AppContext';
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {

    // Width of the tab bar itself
    const tabBarWidth = 150; // adjust based on number of tabs + spacing
    const numberOfTabs = 3;
    const tabWidth = tabBarWidth / numberOfTabs;
    const iconSize = 28;
    return (
        <AppProvider>
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <Tabs
                        detachInactiveScreens
                        screenOptions={{

                            headerShown: false,
                            tabBarShowLabel: false,
                            tabBarActiveTintColor: "#1E293B",
                            tabBarBackground: () => <View style={{ height: 200, flex: 1 }}></View>,

                            tabBarStyle: {
                                bottom: 14,
                                alignSelf: "center",
                                width: tabBarWidth,
                                height: iconSize + 16,
                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                                borderRadius: 30,
                                flexDirection: "row",
                                paddingHorizontal: 0,
                                marginHorizontal: 10
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
                </SafeAreaView>
            </SafeAreaProvider>

        </AppProvider>
    );
}
