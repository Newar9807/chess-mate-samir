import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import ChessboardSquare from "./ChessboardSquare"; // Create ChessboardSquare component
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    mainContainer: {
        top: height / 2 - width / 1.5, // Half box above center
    },
    middleContainer: {
        width,
        height: width,
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    infoText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    timerContainer: {
        alignItems: "center",
        marginBottom: 10,
    },
});


const handleRedo = () => {

}
const handleUndo = () => {

}
const onCancelGame = () => {

}

const HistoryBoard = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>{`Turn: 1`}</Text>
                <Text style={[styles.timerContainer, styles.infoText]}> Time : 11:12</Text>
                <Text style={styles.infoText}>{`Player: Hello`}</Text>
            </View>
            <View style={styles.middleContainer}>
                <ChessboardSquare fen="rnbqkbnr/pp2pppp/2p5/3p4/8/3P4/PPP1PPPP/RNBQKBNR w KQkq - 0 1" />
            </View>
            <View style={styles.infoContainer}>
                <TouchableOpacity onPress={handleUndo}>
                    <FontAwesome name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onCancelGame}>
                    <MaterialIcons name="restart-alt" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleRedo}>
                    <FontAwesome name="arrow-right" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default HistoryBoard;
