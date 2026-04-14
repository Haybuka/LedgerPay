import LedgerSkeleton from "@/atoms/Skeleton";
import React from "react";
import { StyleSheet, View } from "react-native";

export const TransactionItemSkeleton = () => {
    return (
        <View style={styles.container}>
            <View style={styles.lhs}>
                <LedgerSkeleton
                    variant="circle" width={42} height={42} />

                <View style={{ gap: 6 }}>
                    <LedgerSkeleton width={120} height={12} />
                    <LedgerSkeleton width={80} height={10} />
                </View>
            </View>

            <LedgerSkeleton width={60} height={12} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 20,
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    lhs: {
        flexDirection: "row",
        gap: 10,
    },
});