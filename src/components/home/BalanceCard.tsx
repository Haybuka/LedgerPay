import { AppContext } from '@/providers/AppContext'
import { COLORS } from '@/theme/colors'
import { copyToClipboard } from '@/utils/copyToClip'
import { formatCurrency } from '@/utils/currencyFormatter'
import { Ionicons } from '@expo/vector-icons'
import React, { useContext } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { AppTextStyle, Typography } from '../Typography'

type Props = {
    account: string;
    balance: number;
}
const BalanceCard = ({ account, balance }: Props) => {

    const [balanceVisible, setBalanceVisible] = React.useState(true);

    const handleCopy = (item: string) => {
        copyToClipboard(item)
    }
    const context = useContext(AppContext);
    // const toggleBalanceVisibility = async () => {
    //     const newValue = !balanceVisible;

    //     setBalanceVisible(newValue);
    //     setStorageItem('@hideBalance', String(!newValue));
    // };

    // useFocusEffect(
    //     React.useCallback(() => {
    //         getBalanceFromStorage();
    //     }, [])
    // );

    // const getBalanceFromStorage = async () => {
    //     const status = await getStorageItem('@hideBalance');
    //     const isHidden = status === 'true';
    //     Alert.alert('Status', `Balance visibility is ${status ? 'hidden' : 'visible'}`);
    //     setBalanceVisible(!isHidden);
    // }


    return (

        <View>
            <View style={styles.container}>
                <Typography color={COLORS.ledgerBlue} textstyle={AppTextStyle.bodyMedium} >{balanceVisible ? 'Wallet Balance' : 'Account Number'}</Typography>
                <Pressable onPress={context.setHideBalance ? () => context.setHideBalance(!context.hideBalance) : undefined}>
                    <Ionicons
                        name={context.hideBalance ? 'eye-off' : 'eye'}
                        size={24}
                        color={COLORS.ledgerBlue}
                    />
                </Pressable>
            </View>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', }}>
                {!context.hideBalance ? (
                    <>

                        <View style={{
                            backgroundColor: COLORS.ledgerBlue,
                            paddingHorizontal: 4,
                            paddingVertical: 4,
                            borderRadius: 4
                        }}>
                            <Typography textstyle={AppTextStyle.bodyMedium} color={COLORS.white}> $ </Typography>
                        </View>
                        <Typography style={{ fontFamily: 'nunito-Bold' }} textstyle={AppTextStyle.heading3} color={COLORS.ledgerBlue}>{formatCurrency(balance)}</Typography>
                    </>
                ) : (
                    <>
                        <Typography textstyle={AppTextStyle.heading3} color={COLORS.ledgerBlue}>{account}</Typography>

                        <Pressable onPress={() => handleCopy(`${account}`)}>
                            <Ionicons
                                name={'copy-outline'}
                                size={20}
                                color={COLORS.ledgerBlue}
                            />
                        </Pressable>

                    </>

                )}
            </View>
        </View>


    )
}

export default BalanceCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})