import NetInfo from "@react-native-community/netinfo";
import React, { createContext, useEffect, useState } from 'react';

type NetworkContextType = {
    isConnected: boolean | null;
    isReachable: boolean | null;
    isOnline: boolean;
    networkConnectionType: string
};

export const NetworkContext = createContext<NetworkContextType>({} as NetworkContextType);

export const NetworkProvider = ({ children }: { children: React.ReactNode }) => {

    const [isConnected, setIsConnected] = useState<boolean | null>(false);
    const [isOnline, setIsOnline] = useState<boolean>(false);
    const [isReachable, setIsReachable] = useState<boolean | null>(false);
    const [networkConnectionType, setNetworkConnectionType] = useState('');

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            const connectionType = state.type;
            const isConnected = state.isConnected;
            const isNetworkReachable = state.isInternetReachable;
            const isOnline = typeof isConnected === 'boolean' ? isConnected : true;
            setIsConnected(isConnected);
            setIsOnline(isOnline);
            setNetworkConnectionType(connectionType);
            setIsReachable(isNetworkReachable)

        });


        return () => unsubscribe();
    }, []);

    return (
        <NetworkContext.Provider value={{ isConnected, isOnline, isReachable, networkConnectionType }}>
            {children}
        </NetworkContext.Provider>
    );
};