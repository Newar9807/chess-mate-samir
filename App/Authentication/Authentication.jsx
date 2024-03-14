import { StyleSheet, View, StatusBar } from "react-native";

import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import Colors from "../Utils/Colors";
import Navigator from "../Screens/WelcomeScreen/Navitagor";
import StackScreen from "../Screens/StackScreen/StackScreen";

const tokenCache = {
    async getToken(key) {
        try {
            return SecureStore.getItemAsync(key);
        } catch (err) {
            return null;
        }
    },
    async saveToken(key, value) {
        try {
            return SecureStore.setItemAsync(key, value);
        } catch (err) {
            return;
        }
    },
};

export default function Authentication() {
    return (
        <ClerkProvider
            tokenCache={tokenCache}
            publishableKey="pk_test_aG9uZXN0LWphdmVsaW4tNTIuY2xlcmsuYWNjb3VudHMuZGV2JA"
        >
            <View style={styles.container}>
                {/* Sign In Component */}
                <SignedIn>
                    <NavigationContainer>
                        <StackScreen />
                    </NavigationContainer>
                </SignedIn>
                {/* Sign Out Component */}
                <SignedOut>
                    <Navigator />
                </SignedOut>
                <StatusBar backgroundColor={Colors.PRIMARY} barStyle="light-content" />
            </View>
        </ClerkProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
