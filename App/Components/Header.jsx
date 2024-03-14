import { useClerk, useUser } from "@clerk/clerk-expo";
import React, {useEffect} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Colors from "../Utils/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { useChess } from "../Screens/BoardScreen/Design/ChessContext";
import App from "../../App";

export default function Header({ isProfile = false }) {
  const { user } = useUser();
  const navigation = useNavigation();
  const { isGuest, setUserName } = useChess();
  const { signOut } = useClerk();
  
  useEffect(() => {
    // updates the user name
    setUserName(user.firstName);
  }, [setUserName]);

  // Handler function for logout button
  const handleLogout = async () => {
    try {
      await signOut();
      // After successful logout,
      <App />
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Handler function for login button
  const handleLogin = () => {
    // navigate to the login screen
    navigation.push("WelcomeScreen");
  };
  return (
    (user || isGuest) && (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("profile");
            }}
          >
            {isGuest ? (
              <FontAwesome5 name="user" size={25} color="white" />
            ) : (
              <Image
                source={{ uri: user?.imageUrl }}
                style={styles.userImage}
              />
            )}
          </TouchableOpacity>
          <View>
            {!isProfile && (
              <Text
                style={{
                  color: Colors.WHITE,
                  fontFamily: "outfit-medium",
                  alignSelf: "center",
                }}
              >
                Welcome
              </Text>
            )}
            <Text
              style={{
                color: Colors.WHITE,
                fontSize: isProfile ? 13 : 20,
                fontFamily: "outfit-medium",
                alignSelf: "center",
              }}
              onPress={() => {
                navigation.navigate("profile");
              }}
            >
              {isGuest ? <Text>Guest User</Text> : user?.fullName}
            </Text>

            {isProfile && (
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                }}
                onPress={isGuest ? handleLogin : handleLogout}
              >
                {isProfile &&
                  (isGuest ? (
                    <Text
                      style={{
                        color: Colors.WHITE,
                        fontSize: 20,
                        fontFamily: "outfit-medium",
                        alignSelf: "center",
                      }}
                    >
                      Log In
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: Colors.WHITE,
                        fontSize: 20,
                        fontFamily: "outfit-medium",
                        alignSelf: "center",
                      }}
                    >
                      Log Out
                    </Text>
                  ))}
                {isProfile &&
                  (isGuest ? (
                    <FontAwesome name="sign-in" size={27} color="white" />
                  ) : (
                    <FontAwesome name="sign-out" size={27} color="white" />
                  ))}
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* <Feather name="bookmark" size={27} color="white" /> */}
        {/* <View style={styles.searchBarContainer}><TextInput placeholder="Search" style={styles.TextInput}/><Ionicons name="search" style={styles.searchBtn} size={24} color="black" /></View> */}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
  TextInput: {
    padding: 7,
    paddingHorizontal: 16,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    width: "85%",
    fontSize: 16,
    fontFamily: "outfit",
  },
  searchBarContainer: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  searchBtn: {
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 8,
  },
});
