import { COLORS } from '@/theme/colors'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { AppTextStyle, Typography } from '../../atoms/Typography'

type Prop = {
    icon: React.ReactNode;
    title: string;
}
const SettingsMenuItem = ({ icon, title }: Prop) => {
    return (
        <TouchableOpacity activeOpacity={0.4} style={styles.menu}>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', flex: 1 }}>
                {icon}
                <Typography textstyle={AppTextStyle.bodyLarge}>{title}</Typography>
            </View>
            <Ionicons name='chevron-forward' size={24} color={COLORS.ledgerBlue} />
        </TouchableOpacity>
    )
}

export default SettingsMenuItem

const styles = StyleSheet.create({
    menu: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 14,

    }
})