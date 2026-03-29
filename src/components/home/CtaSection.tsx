import { COLORS } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CtaButton from '../CtaButton';


const CtaSection = () => {

    const router = useRouter();
    const handleCtaRoute = () => {

        router.push('/sendMoney');
    }


    return (
        <View style={{ flexDirection: 'row', gap: 16, marginVertical: 20 }}>
            <CtaButton
                label="Send"
onPress={handleCtaRoute}
                icon={<Ionicons size={24} color={COLORS.white} name='swap-horizontal-outline' />}
            />
            <CtaButton
                label="Receive"
                onPress={handleCtaRoute}

                icon={<Ionicons size={24} color={COLORS.white} name='swap-horizontal-outline' />}
            />
            <CtaButton
                label="Swap"
                onPress={handleCtaRoute}

                icon={<Ionicons size={24} color={COLORS.white} name='swap-horizontal-outline' />}
            />
            <CtaButton
                label="More"

                icon={<Ionicons size={24} color={COLORS.white} name='menu-sharp' />}
            />



        </View>
    )
}

export default CtaSection

const styles = StyleSheet.create({})