import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../Utils/Colors";

import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";
import { useNavigation } from "@react-navigation/native";
import { useChess } from "../BoardScreen/Design/ChessContext";


WebBrowser.maybeCompleteAuthSession();

export default function WelcomeScreen() {
  useWarmUpBrowser();
  const navigation = useNavigation();

  const { setGuest }  = useChess();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      setGuest(false);
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
        console.log("session created");
      } else {
        // Use signIn or signUp for next steps such as MFA
        console.log("session not created");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  const GuestMode = () => {
    setGuest(true);
    navigation.push("StackScreen");
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={require("../../../assets/images/screen.jpg")}
        style={styles.welcomeImage}
      />
      <View style={styles.subContainer}>
        <Text style={[styles.quote, { fontSize: 32 }]}>
          Every <Text style={{ fontWeight: "bold" }}>Chess Master</Text> was
          once a <Text style={{ fontWeight: "bold" }}>Beginner</Text>
        </Text>
        <Text style={[styles.quote, { fontSize: 17, marginTop: 20 }]}>
          - Irving Chernev
        </Text>
        <View style={{}}>
          <TouchableOpacity
            style={[styles.button, { marginTop: 25 }]}
            onPress={onPress}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 17,
                color: Colors.PRIMARY,
                fontFamily: 'outfit-medium',
              }}
            >
              Sign In / Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { marginTop: 24 }]}
            onPress={GuestMode}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 17,
                color: Colors.PRIMARY,
                fontFamily: 'outfit-medium',
              }}
            >
              Play as Guest
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  quote: {
    fontFamily: "outfit",
    color: Colors.WHITE,
    textAlign: "center",
  },
  welcomeImage: {
    width: 230,
    height: 450,
    marginTop: 70,
    borderWidth: 4,
    borderColor: Colors.GRAY,
    borderRadius: 15,
  },
  subContainer: {
    width: "100%",
    backgroundColor: Colors.PRIMARY,
    height: "70%",
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 99,
  },
});
