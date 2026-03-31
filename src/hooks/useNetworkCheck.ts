
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

const useNetworkCheck = async () => {
    const checkNetAvailable = async () => {
        try {

            const internetConnection = await NetInfo.fetch();
            const isConnected = internetConnection.isConnected;
            const isOnline = typeof isConnected === 'boolean' ? isConnected : true;
            Alert.alert(
                'Network Status',
                isOnline ? 'You are online' : 'No internet connection',
                [{ text: 'OK' }],
                { cancelable: true }
            );
            // if (!isOnline) {
            //     return Promise.reject(new Error('Please connect to the internet'));
            // }


        return isOnline
        } catch (error) {

        } 
    }
    return (
        {

        }
    )
}

export default useNetworkCheck