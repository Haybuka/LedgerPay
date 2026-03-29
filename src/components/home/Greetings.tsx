import { COLORS } from '@/theme/colors'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { AppTextStyle, Typography } from '../Typography'

type Prop = {

}
const Greetings = ({ }: Prop) => {
    return (
        <View style={styles.bioContainer}>
            <View style={styles.avatar}>
            </View>
            <View>
                <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.bodyLarge}>Hi, </Typography>
                <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.heading8}>Chukwu</Typography>

            </View>

        </View>
    )
}

export default Greetings

const styles = StyleSheet.create({


    bioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 40,
    },
    avatar: {
        height: 40,
        width: 40,
        backgroundColor: COLORS.grey50,
        borderRadius: 20
    },
})