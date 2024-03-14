import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

const InternetCheck = () => {
    const [isConnected, setIsConnected] = useState(true);
    useEffect(() => {
        let intervalId;

        const checkAndSetConnectivity = async () => {
              const state = await NetInfo.fetch();
              setIsConnected(state.isConnected);
              
            // If internet is available, stop further checks
            if (state.isConnected) {
                clearInterval(intervalId);
            }
        };

        // Initial check on component mount
        checkAndSetConnectivity();

        // Periodic check every 5 seconds
        intervalId = setInterval(() => {
            checkAndSetConnectivity();
        }, 5000);

        return () => {
            clearInterval(intervalId); // Clear the interval on component unmount
        };
    }, []);

    return isConnected;
};

export default InternetCheck;
