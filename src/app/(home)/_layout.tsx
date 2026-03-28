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
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#1E293B",
                // tabBarActiveBackgroundColor : 'purple',
                tabBarBackground : () => <View style={{height: 200,  flex : 1}}></View>,
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
                name="index"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons size={size} name='home-outline' color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="transaction"
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
    );
}