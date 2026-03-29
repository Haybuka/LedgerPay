import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { AppTextStyle, Typography } from './Typography';



type Props = {
    children: React.ReactNode;
}

const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close" // 👈 tap outside closes
    />
);

const BottomSheetUsage = forwardRef<BottomSheet, Props>(({  children }, ref) => {
    const snapPoints = useMemo(() => ['40%', '60%'], []);

    return (
        <BottomSheet backdropComponent={renderBackdrop} ref={ref} index={-1} snapPoints={snapPoints} enablePanDownToClose={true} backgroundStyle={{ borderRadius: 20, padding: 20 }} handleIndicatorStyle={{ backgroundColor: '#ccc', width: 40, height: 5, marginBottom: 10 }} >
            <BottomSheetView style={styles.container} >
                {!children ? (
                    <Typography textstyle={AppTextStyle.bodyMediumBold}>Loading...</Typography>
                ) : (
                    children
                )}
            </BottomSheetView>
        </BottomSheet>
    );
});

export default BottomSheetUsage;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    amount: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: '#757575',
    },
    value: {
        fontSize: 14,
        fontWeight: '500',
    },
});