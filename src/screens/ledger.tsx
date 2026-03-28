import { FontAwesome6 } from '@expo/vector-icons/';
import { Pressable, Text, View } from 'react-native';

const LedgerPay = () => {

    const handleCopyToClipboard = (value:string) => {

    }
    return (
        <>
            <View >
                <Text
                >
                    My Balance
                </Text>
                <FontAwesome6 key={''} />
                <Text

                >
                    {`10,000`}
                </Text>
                <View >
                    <View >
                        <Text
                           
                        >
                            Cowry MFB
                        </Text>
                    </View>
                    <Pressable onPress={() => handleCopyToClipboard('2180110745')}>
                        <View >
                            <Text

                            >
                                2180110745
                            </Text>
                            {/* <SVG.Copy width={16} height={16} color={'#000'} /> */}
                        </View>
                    </Pressable>
                </View>


                <View style={{ gap: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                    {/* <MfbSecondaryButton
                        label="Add Money"
                        icon={<SVG.PlusBlue width={12} height={12} />}
                        onPress={() => handleNavigate('AddMoney')}
                    />
                    <MfbSecondaryButton
                        label="Send Money"
                        icon={<SVG.SendMoney width={10} height={10} />}
                        onPress={() => handleNavigate('SendMoney')}
                    /> */}

                </View>
            </View>
        </>
    )
}

export default LedgerPay