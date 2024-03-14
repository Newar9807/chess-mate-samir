import React from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image } from "react-native";
import Colors from "../../../Utils/Colors";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

export const SIZE = width / 8;

const PIECES = {
    bR: require("../../../../assets/pieces/br.png"),
    bN: require("../../../../assets/pieces/bn.png"), 
    bB: require("../../../../assets/pieces/bb.png"),
    bQ: require("../../../../assets/pieces/bq.png"),
    bK: require("../../../../assets/pieces/bk.png"),
    bp: require("../../../../assets/pieces/bp.png"),
    wp: require("../../../../assets/pieces/wp.png"),
    wR: require("../../../../assets/pieces/wr.png"),
    wN: require("../../../../assets/pieces/wn.png"),
    wB: require("../../../../assets/pieces/wb.png"),
    wQ: require("../../../../assets/pieces/wq.png"),
    wK: require("../../../../assets/pieces/wk.png"),
};

export default function ChessboardSquare({ fen }) {
    const WHITE = Colors.BOARDGREEN;
    const BLACK = Colors.BOARDLIGHTGREEN;

    const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

    const getPieceImage = (piece) => {
        return PIECES[piece];
    };

    const renderChessboardSquares = () => {
        let board = [];
        for (let i = 0; i < 8; i++) {
            board.push([]);
            for (let j = 0; j < 8; j++) {
                board[i][j] = null; // Initially, no piece on squares
            }
        }
        const storeBoard = [];

        for (const row of fen.split('/')) {
            const brow = [];
            for (const c of row) {
                if (c === ' ') {
                    break;
                } else if (c.match(/[1-8]/)) {
                    brow.push(...Array(parseInt(c)).fill('--'));
                } else if (c === 'p') {
                    brow.push('bp');
                } else if (c === 'P') {
                    brow.push('wp');
                } else if (c > 'Z') {
                    brow.push('b' + c.toUpperCase());
                } else {
                    brow.push('w' + c);
                }
            }
            storeBoard.push(brow);
        }

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const isBlackSquare = (i + j) % 2 === 0;
                const backgroundColor = isBlackSquare ? BLACK : WHITE;
                const color = isBlackSquare ? WHITE : BLACK;
                const textStyle = { fontWeight: "500", color };
                const position = `${horizontalAxis[j]}${verticalAxis[7 - i]}`;
                const piece = storeBoard[i][j];
                board[i][j] = (
                    <View
                        key={position}
                        style={[
                            styles.square,
                            styles.piece,
                            {
                                backgroundColor,
                                zIndex: 0,
                                borderTopLeftRadius: i === 0 && j === 0 ? 5 : 0,
                                borderTopRightRadius: i === 0 && j === 7 ? 5 : 0,
                                borderBottomLeftRadius: i === 7 && j === 0 ? 5 : 0,
                                borderBottomRightRadius: i === 7 && j === 7 ? 5 : 0,
                            },
                        ]}
                    >
                        <Text style={[textStyle, { opacity: j === 0 ? 1 : 0 }]}>
                            {verticalAxis[7 - i]}
                        </Text>
                        {i === 7 && (
                            <Text style={[textStyle, { alignSelf: "flex-end" }]}>
                                {horizontalAxis[j]}
                            </Text>
                        )}
                        {
                            piece && (
                                <Image
                                    source={getPieceImage(piece)}
                                    style={{
                                        height: SIZE,
                                        width: SIZE,
                                        marginTop: -SIZE,
                                    }}
                                />
                            )
                        }
                    </View>
                );
            }
        }

        return board.map((row, i) => (
            <View key={i} style={styles.row}>
                {row}
            </View>
        ));
    };

    return (
        <ImageBackground style={styles.column}>
            {renderChessboardSquares()}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    column: {
        flex: 1,
    },
    row: {
        flex: 1,
        flexDirection: "row",
    },
    square: {
        flex: 1,
        padding: 1,
        justifyContent: "space-between",
    },
    piece: {
        height: SIZE,
        width: SIZE,
    },
});
