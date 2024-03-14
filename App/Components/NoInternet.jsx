import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react';
import InternetCheck from './InternetCheck';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function NoInternet({ noInternet = true }) {

    const isConnected = InternetCheck();

    const styles = StyleSheet.create({
        text: {
            fontSize: 22,
            fontFamily: "outfit-bold",
        },
        noInternetContainer: {
            marginTop: isConnected ? '2%' : '55%',
            alignItems: "center",
            justifyContent: "center",
        },
        noInternetText: {
            color: "red",
            fontFamily: "outfit-medium",
            textAlign: 'center',
        },
        whiteKing: {
            fontSize: 35,
        },
        blackKing: {
            fontSize: 35,
        },
    });

    let comment;
    (noInternet) ? (comment = 'No Internet Connection\nReloads in every 5 second') : (comment = '✖ No Data Found ✖\nReloads in every 5 second');

    return (
        <View style={styles.noInternetContainer}>
            <Text style={styles.text}>
                <Text style={styles.whiteKing}>&#9812; </Text>
                Chess Mate
                <Text style={styles.blackKing}> &#9818;</Text>
            </Text>
            {
                noInternet ? (
                    <Feather name="wifi-off" size={250} color="black" />
                ) : (
                    <MaterialCommunityIcons name="database-off-outline" size={250} color="black" />
                )
            }

            <Text style={styles.noInternetText}>
                {comment}
            </Text>
        </View>
    );
}
