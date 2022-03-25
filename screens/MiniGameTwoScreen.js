import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/core';
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { colors, CLEAR, ENTER, colorsToEmoji } from "../src/constants";
import Keyboard from "../src/components/Keyboard";


const NUMBER_OF_TRIES = 6;

const copyArray = (arr) => {
  return [...arr.map((rows) => [...rows])];
};

var RandomNumber = Math.floor(Math.random() * 100);
const words = [
  'cigar',
 /* 'rebut',
  'sissy',
  'humph',
  'awake',
  'blush',
  'focal',
  'evade',
  'naval',
  'serve',
  'heath',
  'dwarf',
  'model',
  'karma',
  'stink',
  'grade',
  'quiet',
  'bench',
  'abate',
  'feign',
  'major',
  'death',
  'fresh',
  'crust',
  'stool',
  'colon',
  'abase',
  'marry',
  'react',
  'batty',
  'pride',
  'floss',
  'helix',
  'croak',
  'staff',
  'paper',
  'unfed',
  'whelp',
  'trawl',
  'outdo',
  'adobe',
  'crazy',
  'sower',
  'repay',
  'digit',
  'crate',
  'cluck',
  'spike',
  'mimic',
  'pound',
  'maxim',
  'linen',
  'unmet',
  'flesh',
  'booby',
  'forth',
  'first',
  'stand',
  'belly',
  'ivory',
  'seedy',
  'print',
  'yearn',
  'drain',
  'bribe',
  'stout',
  'panel',
  'crass',
  'flume',
  'offal',
  'agree',
  'error',
  'swirl',
  'argue',
  'bleed',
  'delta',
  'flick',
  'totem',
  'wooer',
  'front',
  'shrub',
  'parry',
  'biome',
  'lapel',
  'start',
  'greet',
  'goner',
  'golem',
  'lusty',
  'loopy',
  'round',
  'audit',
  'lying',
  'gamma',
  'labor',
  'islet',
  'civic',
  'forge',
  'corny',

*/
];
export default function App() {
  const word = words[0];
  //const word = "hello";
  const letters = word.split(""); // ['h', 'e', 'l', 'l', 'o']
  
  const navigation = useNavigation();
  
  const goToHomeScreen = () => {
    navigation.replace("Home");
  }
  const [rows, setRows] = useState(
    new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill(""))
  );
  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);
  const [gameState, setGameState] = useState("playing"); // won, lost, playing

  useEffect(() => {
    if (curRow > 0) {
      checkGameState();
    }
  }, [curRow]);
  const RestartGame = () => {
    navigation.replace("MiniGameTwo");
  }
  const checkGameState = () => {
    if (checkIfWon() && gameState !== "won") {
      Alert.alert("Awesome!", "You won!", [
        { text: "Home", onPress: goToHomeScreen },
      ]);
      setGameState("won");
    } else if (checkIfLost() && gameState !== "lost") {
      Alert.alert("Bad Luck", "Try Again" [
        { text: "Restart", onPress: RestartGame }
      ]);
      setGameState("lost");
    }
  };


  /*const shareScore = () => {
    const textMap = rows
      .map((row, i) =>
        row.map((cell, j) => colorsToEmoji[getCellBGColor(i, j)]).join("")
      )
      .filter((row) => row)
      .join("\n");
    const textToShare = `Wordle \n${textMap}`;
    Clipboard.setString(textToShare);
    Alert.alert("Copied successfully", "Share your score on you social media");
  };*/

  const checkIfWon = () => {
    const row = rows[curRow - 1];

    return row.every((letter, i) => letter === letters[i]);
  };

  const checkIfLost = () => {
    return !checkIfWon() && curRow === rows.length;
  };

  const onKeyPressed = (key) => {
    if (gameState !== "playing") {
      return;
    }

    const updatedRows = copyArray(rows);

    if (key === CLEAR) {
      const prevCol = curCol - 1;
      if (prevCol >= 0) {
        updatedRows[curRow][prevCol] = "";
        setRows(updatedRows);
        setCurCol(prevCol);
      }
      return;
    }

    if (key === ENTER) {
      if (curCol === rows[0].length) {
        setCurRow(curRow + 1);
        setCurCol(0);
      }

      return;
    }

    if (curCol < rows[0].length) {
      updatedRows[curRow][curCol] = key;
      setRows(updatedRows);
      setCurCol(curCol + 1);
    }
  };

  const isCellActive = (row, col) => {
    return row === curRow && col === curCol;
  };

  const getCellBGColor = (row, col) => {
    const letter = rows[row][col];

    if (row >= curRow) {
      return colors.black;
    }
    if (letter === letters[col]) {
      return colors.primary;
    }
    if (letters.includes(letter)) {
      return colors.secondary;
    }
    return colors.darkgrey;
  };

  const getAllLettersWithColor = (color) => {
    return rows.flatMap((row, i) =>
      row.filter((cell, j) => getCellBGColor(i, j) === color)
    );
  };

  const greenCaps = getAllLettersWithColor(colors.primary);
  const yellowCaps = getAllLettersWithColor(colors.secondary);
  const greyCaps = getAllLettersWithColor(colors.darkgrey);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.title}>WORDLE</Text>

      <ScrollView style={styles.map}>
        {rows.map((row, i) => (
          <View key={`row-${i}`} style={styles.row}>
            {row.map((letter, j) => (
              <View
                key={`cell-${i}-${j}`}
                style={[
                  styles.cell,
                  {
                    borderColor: isCellActive(i, j)
                      ? colors.grey
                      : colors.darkgrey,
                    backgroundColor: getCellBGColor(i, j),
                  },
                ]}
              >
                <Text style={styles.cellText}>{letter.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <Keyboard
        onKeyPressed={onKeyPressed}
        greenCaps={greenCaps} // ['a', 'b']
        yellowCaps={yellowCaps}
        greyCaps={greyCaps}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
  },
  title: {
    color: colors.lightgrey,
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 7,
  },

  map: {
    alignSelf: "stretch",
    marginVertical: 20,
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  cell: {
    borderWidth: 3,
    borderColor: colors.darkgrey,
    flex: 1,
    maxWidth: 70,
    aspectRatio: 1,
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    color: colors.lightgrey,
    fontWeight: "bold",
    fontSize: 28,
  },
});