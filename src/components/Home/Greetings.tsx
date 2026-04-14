import { AvatarBase } from '@/atoms'
import Typography, { AppTextStyle } from '@/atoms/Typography'
import { COLORS } from '@/theme/colors'
import React from 'react'
import { StyleSheet, View } from 'react-native'

type Prop = {
    firstName: string;
    lastName: string
}
const Greetings = ({ firstName = 'Hi', lastName = 'there' }: Prop) => {
    return (
        <View style={styles.bioContainer}>
            <AvatarBase >
                <Typography
                    color={COLORS.white} textstyle={AppTextStyle.heading8}
                    style={{ textTransform: 'capitalize' }}
                >
                    {firstName?.charAt(0)?.toUpperCase()}
                    {lastName?.charAt(0)?.toUpperCase()}</Typography>
            </AvatarBase>

            <View>
                <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.bodyMedium}>Good evening, </Typography>
                <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.heading8} style={{ textTransform: 'capitalize' }}>{firstName} {lastName}</Typography>

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
        justifyContent: 'center',
        alignItems: 'center'
    },
})