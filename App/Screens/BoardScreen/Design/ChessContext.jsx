import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { Chess } from "chess.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChessContext = createContext();

function useConst(initialValue) {
  const ref = useRef();
  if (!ref.current) {
    ref.current = {
      value: typeof initialValue === "function" ? initialValue() : initialValue,
    };
  }
  return ref.current.value;
}

export const useChess = () => {
  const context = useContext(ChessContext);
  if (!context) {
    throw new Error("useChess must be used within a ChessProvider");
  }
  return context;
};
// Assuming you have a variable to store FEN
let fenHistory = [];
let intervalId;

export const ChessProvider = ({ children }) => {
  const fenWithPromotion = "rnbqkbnr/pP6/8/8/8/8/1P6/RNBQKBNR b KQkq - 0 1";
  const chessRef = useConst(() => new Chess());
  // const chessRef = new Chess(fenWithPromotion);
  const [userName, setUserNameState] = useState();

  const setUserName = useCallback((newUserName) => {
    setUserNameState(newUserName);
  }, []);

  const [isGuest, setGuest] = useState(false);
  
  const [showRecord, setShowRecord] = useState(false);

  const [savedGames, setSavedGames] = useState([]);

  const fetchGames = useCallback(async () => {
    try {
      const state = await getSavedGames();
      setSavedGames(state);
      // If internet is available and savedGames is not empty, stop further checks
      if (state.length > 0) {
        clearInterval(intervalId);
      }
    } catch (error) {
      console.error('Error fetching games: ', error);
    }
  }, []);

  useEffect(() => {
    // Initial check on component mount
    fetchGames();
    // Periodic check every 5 seconds
    intervalId = setInterval(() => {
      fetchGames();
    }, 5000);
    return () => {
      clearInterval(intervalId); // Clear the interval on component unmount
    };
  }, [fetchGames]);



  const [state, setState] = useState({
    player: "w",
    board: chessRef.board(),
    turn: 1,
    isGameFinished: false,
  });

  const onTurn = useCallback(() => {
    if (chessRef) {
      const currentTurn = chessRef.turn();
      setState((prevState) => ({
        player: currentTurn,
        board: chessRef.board(),
        turn: prevState.turn + 1,
        isGameFinished: chessRef.isCheckmate() || chessRef.isDraw(),
      }));
    }
  }, [chessRef]);

  const undoLastMove = () => {
    if (chessRef) {
      const moves = chessRef.history({ verbose: true });
      if (moves.length > 0) {
        const lastMove = chessRef.undo();
        if (lastMove) {
          const promotionSquare = lastMove.from;
          const promotedPiece = chessRef.get(promotionSquare);
          // Check if the last move was a promotion and revert it
          // if (promotedPiece && promotedPiece.type === "q") {
          //   chessRef.put(
          //     { type: "p", color: chessRef.turn() },
          //     promotionSquare
          //   );
          // }
        }

        // Store the undone move and current FEN for redo
        // const currentFen = chessRef.fen();
        // fenHistory.push({ move: lastMove, fen: currentFen });

        setState((prevState) => ({
          player: prevState.player === "w" ? "b" : "w",
          board: chessRef.board(),
          turn: prevState.turn - 1,
          isGameFinished: false,
        }));
      }
    }
  };

  const redoLastMove = () => {
    console.log(fenHistory.length);
    if (chessRef && fenHistory.length > 0) {
      const { move, fen } = fenHistory.pop();
      chessRef.load(fen); // Load the FEN to restore the board state
      chessRef.move(move); // Reapply the move

      setState((prevState) => ({
        player: chessRef.turn(),
        board: chessRef.board(),
        turn: prevState.turn + 1,
        isGameFinished: chessRef.isCheckmate() || chessRef.isDraw(),
      }));
    }
  };

  const resetRecord = async () => {
    try {
      await AsyncStorage.removeItem("savedGames");
      fetchGames();
      console.log("Data removed successfully");
    } catch (error) {
      console.error("Error removing data: ", error);
    }
  };

  const saveGame = async (currentTime) => {
    if (chessRef) {
      try {
        const history = chessRef.history({ verbose: true });
        const wonPlayer = chessRef.turn() === "w" ? "BLACK" : "WHITE";
        const newDetails = {
          user: userName,
          player: wonPlayer,
          time: currentTime,
          moves: history,
        };

        // Get existing games from AsyncStorage
        const existingData = await AsyncStorage.getItem("savedGames");

        // Parse existing JSON data or initialize as an empty array
        const existingGames = existingData ? JSON.parse(existingData) : [];

        // Add the new game record to the existing array
        existingGames.push(newDetails);

        // Sort the game records based on the time property in ascending order
        existingGames.sort((a, b) => {
          // Assuming time is in the format "hh:mm:ss"
          const timeA = new Date(`2000-01-01T${a.time}`);
          const timeB = new Date(`2000-01-01T${b.time}`);
          return timeA - timeB;
        });

        // Keep only the top 8 records
        const top8Games = existingGames.slice(0, 8);

        // Add s.no to each game
        const gamesWithSNo = top8Games.map((game, index) => ({
          ...game,
          position: index + 1,
        }));
        console.log(gamesWithSNo);

        // Save the updated array back to AsyncStorage
        await AsyncStorage.setItem("savedGames", JSON.stringify(gamesWithSNo));

        console.log("Game saved successfully.");
      } catch (error) {
        console.error("Error saving game: ", error);
      }
    }
  };

  const getSavedGames = async () => {
    try {
      const existingData = await AsyncStorage.getItem("savedGames");

      if (!existingData) {
        // No saved games found
        return [];
      }

      const existingGames = JSON.parse(existingData);

      if (!Array.isArray(existingGames)) {
        // Data is not in the expected format
        console.error("Invalid data format in AsyncStorage");
        return [];
      }

      // Sort the game records based on the time property in ascending order
      existingGames.sort((a, b) => {
        // Assuming time is in the format "hh:mm:ss"
        const timeA = new Date(`2000-01-01T${a.time}`);
        const timeB = new Date(`2000-01-01T${b.time}`);
        return timeA - timeB;
      });

      // Keep only the top 8 records
      const top8Games = existingGames.slice(0, 8);

      // Map records to the desired format
      const gameRecords = top8Games.map((record) => ({
        user: record.user,
        position: record.position,
        player: record.player,
        time: record.time,
      }));

      return gameRecords;
    } catch (error) {
      console.error("Error retrieving saved games: ", error);
      return [];
    }
  };


  const resetBoard = () => {
    if (chessRef) {
      chessRef.reset();
      setState({
        player: "w",
        board: chessRef.board(),
        turn: 1,
        isGameFinished: false,
      });
    }
  };

  const changeState = () => {
    if (chessRef) {
      const currentTurn = chessRef.turn();
      // chessRef.turn();
      // currentTurn = chessRef.turn();
      // setState((prevState) => ({
      //   player: currentTurn === "w" ? "b" : "w",
      //   // board: chessRef.board(),
      //   turn: prevState.turn + 1,
      //   isGameFinished: chessRef.isCheckmate() || chessRef.isDraw(),
      // }));
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      // Implement your timer logic here
      // Ensure that chessRef is still defined if needed
    }, 1000);

    return () => clearInterval(timer);
  }, [chessRef]); // Include chessRef in the dependency array if needed

  return (
    <ChessContext.Provider
      value={{
        state,
        chessRef,
        onTurn,
        undoLastMove,
        redoLastMove,
        saveGame,
        getSavedGames,
        resetBoard,
        changeState,
        resetRecord,
        isGuest,
        setGuest,
        savedGames,
        fetchGames,
        setUserName,
        setShowRecord,
        showRecord
      }}
    >
      {children}
    </ChessContext.Provider>
  );
};


const PieceContext = createContext();

export const PieceProvider = ({ children }) => {
  const [isTapped, setTapped] = useState(false);

  return (
    <PieceContext.Provider value={{ isTapped, setTapped }}>
      {children}
    </PieceContext.Provider>
  );
};

export const usePieceContext = () => useContext(PieceContext);


