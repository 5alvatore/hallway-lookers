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
import { database } from '../firebase';
import { addUnlockedBuilding, getUserInfo } from '../services/getDataFromFirebase';


const NUMBER_OF_TRIES = 6;

const copyArray = (arr) => {
  return [...arr.map((rows) => [...rows])];
};

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}
var RandomNumber = Math.floor(Math.random() * 100);
const words = [
  'cigar',
  'rebut',
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

];

const addUnlockedBuildingToDB = (data) => {
  console.log("add unlock building", data.imageUrl)
  if (data.imageUrl == 'lambton') {
    addUnlockedBuilding(2, "essex").then((snapshot) => {
      console.log(snapshot);
    })
  }
}

export default function App(props) {
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

  const [isTimeSavedForMini, setIsTimeSavedForMini] = useState(false)
  const [miniStartTime, setMiniStartTime] = useState(0)
  const [isHotspotTimeSaved, setIsHotspotTimeSaved] = useState(false)

  useEffect(() => {
    if (curRow > 0) {
      checkGameState();
    }
  }, [curRow]);

  // function to get the start time for the mini game
  const getstartTime = () => {
    console.log("is time saved??", isTimeSavedForMini)

    if (!isTimeSavedForMini) {
      const currentTime = Date.now()
      console.log("Current mini game start time is ", currentTime)
      setMiniStartTime(currentTime)
      setIsTimeSavedForMini(true)

    }
  }

  // function to get the mini game completed time
  const getGameTime = () => {
    if (checkIfWon()) {
      const currentTime = Date.now()
      return (currentTime - miniStartTime)
    }
  }

  // function to store last time for each hotspot
  const storeTimeForHotspot = () => {
    // store time for lambton building
    if (props.route.params.dataFromAR.imageUrl == 'lambton') {
      if (!isHotspotTimeSaved) {
        const currentTime = Date.now()
        console.log("Current time for mini game 1 end is  ", currentTime)

        user = getUserInfo();
        //console.log("user is", user)
        const getGameTimee = getGameTime()
        const reference = database.ref();
        if (user) {
          reference.child("users").child(user.uid).child("pathway1timer").get().then((snapshot) => {
            if (snapshot.exists()) {
              // update the hotspot1 timer
              reference.child("users").child(user.uid).child("pathway1timer").update({
                hotspot1: getGameTimee
              })
              console.log("Total time taken for mini game 1", snapshot.val().hotspot1)
              setIsHotspotTimeSaved(true);
            }
          })
        }
      }
    }
  }


  // develop hotspot point logic
  const calculateHotspotPoints = (timetaken, score) => {
    // min and max are in milliseconds, min is 10 seconds and max is 1 minute
    console.log("how much time and score for game", timetaken, score)
    let min = 10000, max = 60000
    if (timetaken == undefined || score <= 0) {
      score = 0
    }
    if (timetaken <= min) {
      score += 10;
    }
    else if (timetaken >= min && timetaken <= max) {
      score += 5;
    }
    else {
      score -= 10
    }
    return score
  }

  // to calculate the hotspot points of a game
  const calculateHotPoints = () => {
    user = getUserInfo()
    const reference = database.ref();

    if (props.route.params.dataFromAR.imageUrl == 'lambton') {
      if (user) {
        reference.child("users").child(user.uid).get().then((snapshot) => {
          if (snapshot.exists()) {
            const userscore = snapshot.val().score;
            const minigame1time = snapshot.child("pathway1timer").val().hotspot1;
            console.log("userscore and minigame1 time", userscore, minigame1time)
            const hotspotscorecalculated = calculateHotspotPoints(minigame1time, userscore)
            reference.child("users").child(user.uid).update({
              score: hotspotscorecalculated
            })
          }
        })
      }
    }

  }


  const RestartGame = () => {
    setCurCol(0);
    setCurRow(0);
    const word = words[0];
    const letters = word.split(""); // ['h', 'e', 'l', 'l', 'o']
    setRows(new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill("")));
    setGameState("playing");

  }
  const forceUpdate = useForceUpdate();

  const addUnlockedFunction = () => {
    addUnlockedBuildingToDB(props.route.params.dataFromAR)
    navigation.navigate('Hallway Lookers', { screen: 'PathwayScreen' })
  }


  const checkGameState = () => {
    if (checkIfWon() && gameState !== "won") {

      {/* function to store time taken for current hotspot */ }
      storeTimeForHotspot()
      {/* function to calculate points scored in a particular hotspot */ }
      calculateHotPoints()

      Alert.alert("Awesome!", "You won!", [
        {
          text: "Go To Pathways",
          // Write conditions here to calculate the time taken to complete the game
          //onPress: goToHomeScreen
          onPress: addUnlockedFunction
        },
      ]);
      setGameState("won");
    }
    else if (checkIfLost() && gameState !== "lost") {
      Alert.alert("Bad Luck", "Try Again", [
        { text: "Restart", onPress: RestartGame }
      ]);
      setGameState("restart");
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
    // conditions to start the timer here
    getstartTime()


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