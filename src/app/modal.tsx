import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function RootModal() {
    return (
        <View style={styles.overlay}>
            {/* Modal content */}
            <View style={styles.container}>
                <View style={styles.closeButtonContainer}>
                    <Pressable
                        onPress={() => router.back()}
                    >
                        <Ionicons name="close" size={25} color="#fff" />
                    </Pressable>
                </View>
                <Text style={styles.title}>Create Something 🚀</Text>
                <Text style={styles.subtitle}>This is your root modal popup.</Text>


                {/* Close button */}

            </View>
        </View>
    );
}

// ✅ Styles
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)", // semi-transparent overlay
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
    },
    container: {
        width: "100%",
        backgroundColor: "#000",
        paddingVertical: 24,
        paddingHorizontal: 16,
        // alignItems: "center",
        flex: 1,
        marginTop: 150
    },
    closeButtonContainer: {
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 20,
        textAlign: "center",
    },

    actionText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    closeButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    closeText: {
        fontSize: 16,
        color: "#333",
    },
});