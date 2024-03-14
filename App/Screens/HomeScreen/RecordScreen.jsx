import React from "react";
import { View, Text, Image, ImageBackground, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import RecordCss from "../../Utils/RecordCss";
import Colors from "../../Utils/Colors";
import { useChess } from "../BoardScreen/Design/ChessContext";
import InternetCheck from "../../Components/InternetCheck";
import NoInternet from "../../Components/NoInternet";
import { useNavigation } from "@react-navigation/native";

const RecordScreen = () => {
  const { savedGames, fetchGames, setShowRecord } = useChess();
  const isConnected = InternetCheck();
  const navigation = useNavigation();

  const navigateToGame = (item) => {
    console.log("Player " + item.player);
    setShowRecord(true);
    navigation.navigate('historyboard');
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToGame(item)}>
      <View style={[
        RecordCss.tableRow,
        {
          backgroundColor:
            item.position == 1
              ? "#f7c631"
              : item.position == 2
                ? "#bebdb9"
                : item.position == 3
                  ? "#d5a47d"
                  : Colors.WHITE,
        },
      ]}>
        <Text style={RecordCss.tableCell}>
          {item.position <= 3 ? "#" : ""}
          {item.position}
        </Text>
        <Text style={[RecordCss.tableCell, { fontFamily: 'outfit-medium' }]}>{item.user}</Text>
        <Text style={RecordCss.tableCell}>{item.player}</Text>
        <Text style={RecordCss.tableCell}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );
  const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: 200,
      alignSelf: 'center'
    },
    bgImg: {
      width: '100%',
      height: savedGames.length == 1 ? 300 : savedGames.length == 2 ? 255 : savedGames.length == 3 ? 209 : 200,
      resizeMode: 'contain'
    }
  });

  return (
    <View>
      {/* <Heading text="Game Records" isRecord={true} /> */}
      <View style={[RecordCss.container, RecordCss.scrollContainer,]}>
        <Image style={styles.image} source={require("../../../assets/images/chess.png")} />
        {
          isConnected &&
          <View style={RecordCss.tableHeader}>
            <Text style={[RecordCss.tableCell, RecordCss.headerCell]}>
              Position
            </Text>
            <Text style={[RecordCss.tableCell, RecordCss.headerCell]}>
              User
            </Text>
            <Text style={[RecordCss.tableCell, RecordCss.headerCell]}>
              Player
            </Text>
            <Text style={[RecordCss.tableCell, RecordCss.headerCell]}>Time</Text>
          </View>
        }
        {/* <ImageBackground style={styles.bgImg} source={require("../../../assets/images/filler.png")} > */}
        <View style={[{
          paddingHorizontal: "3%",
        }]}>
          {
            isConnected ? (
              (savedGames.length === 0) ? (
                <TouchableOpacity onPress={fetchGames}>
                  <NoInternet noInternet={false} />
                </TouchableOpacity>
              ) : (
                <FlatList
                  data={savedGames}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  ListFooterComponent={() => (
                    (savedGames.length < 9) && (
                      <TouchableOpacity onPress={fetchGames}>
                        <Image style={styles.bgImg} source={require("../../../assets/images/filler.png")} />
                      </TouchableOpacity>
                    )
                  )}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 250 }}
                />)

            ) : (
              <NoInternet />
            )

          }
        </View>
        {/* </ImageBackground> */}
      </View>
    </View>
  );
};

export default RecordScreen;