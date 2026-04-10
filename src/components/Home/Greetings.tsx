import { COLORS } from '@/theme/colors'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { AppTextStyle, Typography } from '../../atoms/Typography'

type Prop = {
    firstName: string;
    lastName: string
}
const Greetings = ({ firstName, lastName }: Prop) => {
    return (
        <View style={styles.bioContainer}>
            <View style={styles.avatar}>
                <Typography
                    color={COLORS.ledgerBlue} textstyle={AppTextStyle.bodyLarge}
                > {firstName.charAt(0).toUpperCase()}
                    {lastName.charAt(0).toUpperCase()}</Typography>
            </View>
            <View>
                <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.bodyMedium}>Good evening, </Typography>
                <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.heading8}>{firstName} {lastName}</Typography>

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
        borderRadius: 20,
        justifyContent : 'center',
        alignItems : 'center'   
    },
})