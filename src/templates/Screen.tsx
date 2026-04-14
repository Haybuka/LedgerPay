import { COLORS } from '@/theme/colors';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


type Props = {
    children: React.ReactNode;
}
const Screen = ({ children }: Props) => {

    const safeInsets = useSafeAreaInsets()
    return (
        <View style={{ 
            flex: 1, 
            backgroundColor: COLORS.white, 
            paddingBottom: safeInsets.bottom,
            paddingHorizontal:16 ,
            paddingTop: safeInsets.top
        }}>
            {children}
        </View>
    )
}

export default Screen
