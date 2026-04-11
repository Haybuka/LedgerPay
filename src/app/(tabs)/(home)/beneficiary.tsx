import BeneficiaryContactList from '@/components/Beneficiary'
import { Header } from '@/organisms'
import { Screen } from '@/templates'
import { useNavigation } from 'expo-router'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'

const Beneficiary = () => {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: { display: 'none' },
        });

        return () => {
            navigation.getParent()?.setOptions({
                tabBarStyle: undefined, // restore when leaving
            });
        };
    }, [navigation]);

    return (
        <Screen >
            <Header title='Select Beneficiary' showIconLeft={true} />
            <BeneficiaryContactList />
        </Screen>
    )
}

export default Beneficiary

const styles = StyleSheet.create({})