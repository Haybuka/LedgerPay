import { COLORS } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CtaButton from '../CtaButton';


const CtaSection = () => {

    const router = useRouter();
    const handleCtaRoute = () => {

        router.push('/beneficiary');
    }


    return (
        <View style={{ flexDirection: 'row', gap: 16, marginVertical: 20 }}>
            <CtaButton
                label="Receive"
                onPress={handleCtaRoute}

                icon={<Ionicons size={24} color={COLORS.white} name="arrow-down" />}
            />
            <CtaButton
                label="Send"
                onPress={handleCtaRoute}
                bgColor='#E10600'
                icon={<Ionicons size={24} color={COLORS.white} name="arrow-up" />}
            />
            <CtaButton
                label="Swap"
                onPress={handleCtaRoute}
                bgColor="#0072CE"
                icon={<Ionicons size={24} color={COLORS.white} name='swap-horizontal' />}
            />
            <CtaButton
                label="More"
                bgColor="#9E9E9E"
                icon={<Ionicons size={24} color={COLORS.white} name="ellipsis-horizontal" />}
            />



        </View>
    )
}

export default CtaSection

const styles = StyleSheet.create({})