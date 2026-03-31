import { NetworkContext } from "@/providers/NetworkContext";
import React, { useContext, useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NetworkBanner() {
  const { isOnline, isReachable } = useContext(NetworkContext);
  const insets = useSafeAreaInsets();

  const translateY = useRef(new Animated.Value(-100)).current;
  const isOffline = !isOnline || !isReachable;

  useEffect(() => {
    if (isOffline) {
      // show banner
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
    } else {
      // hide after short delay
      setTimeout(() => {
        Animated.timing(translateY, {
          toValue: -100,
          duration: 600,
          useNativeDriver: true,
        }).start();
      }, 1500);
    }
  }, [isOffline]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          height: 60 + insets.top,
          backgroundColor: isOffline ? "#D32F2F" : "#2E7D32",
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={styles.text}>
        {isOffline ? "No Internet Connection" : "Back Online"}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
  },
});