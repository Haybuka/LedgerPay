import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(home)',
};

export default function RootLayout() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={DefaultTheme}>

        <Stack>
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
          <Stack.Screen name="modal"
            options={{
              presentation: "modal",       // slide-up by default on iOS
              headerShown: false,
              animation: "slide_from_bottom" // forces slide-up
            }}
          />
        </Stack>
        <StatusBar style="auto" backgroundColor='transparent' />
      </ThemeProvider>
    </GestureHandlerRootView>


  );
}
