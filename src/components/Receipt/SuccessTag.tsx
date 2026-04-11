import Typography, { AppTextStyle } from '@/atoms/Typography';
import { COLORS } from '@/theme/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const SuccessTag = ({ text }: { text: string }) => {
  return (
    <View
      style={styles.container}
    >
     
      <Typography color={'light'} textstyle={AppTextStyle.bodyMedium}>
        {text}
      </Typography>
    </View>
  );
};

export default SuccessTag;
const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    flexDirection: 'row',
    columnGap: 8,
    backgroundColor: COLORS.green500,
    borderRadius: 100,
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 11
  },
  svgBox: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
