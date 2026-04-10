
import { COLORS } from '@/theme/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type Prop = {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
    width ? : number
}
const LedgerPayReceiptEllipse = ({ top, left, bottom, right , width = 20}: Prop) => {
    return <View  style={[styles.ellipse, { width, top, left, bottom, right }]} />;
};

export default LedgerPayReceiptEllipse;

const styles = StyleSheet.create({
    ellipse: {
        height: 10,
        borderTopRightRadius : 10,
        borderTopLeftRadius : 10,
        opacity: 1,
        position: 'absolute',
       backgroundColor : COLORS.ledgerBlue
      
    },
});