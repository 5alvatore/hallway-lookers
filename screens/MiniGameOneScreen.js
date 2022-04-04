import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from '../entities';
import Physics from '../utils/physics';
import { useNavigation } from '@react-navigation/core'
import { addUnlockedBuilding } from '../services/getDataFromFirebase';

const App = (props) => {
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentPoints, setCurrentPoints] = useState(0)
  const [endGame, setEndGame] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    setRunning(false)
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 20 }}>{currentPoints}</Text>
      <GameEngine
        ref={(ref) => { setGameEngine(ref) }}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case 'game_over':
              setRunning(false)
              gameEngine.stop()
              break;
            case 'new_point':
              setCurrentPoints(currentPoints + 1)
              if (currentPoints == 2) {
                setRunning(false)
                gameEngine.stop()
                setEndGame(true)
              }
              break;
            //            case 'win_point':
            //              if(currentPoints === 5)
            //              setRunning(false)
            //              gameEngine.stop()
            //             break;
          }
        }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <StatusBar style="auto" hidden={true} />

      </GameEngine>
      {endGame ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', color: 'red', fontSize: 40, textAlign: 'center' }}>
            YOU WON!!!
          </Text>
          <Text style={{ fontWeight: 'bold', color: 'yellow', fontSize: 30, textAlign: 'center' }}>
            {'\n'}
            {props.route.params.dataFromAR.imageUrl == 'erie' ? 'Erie Hall Unlocked!!' :
              props.route.params.dataFromAR.imageUrl == 'lambton' ? 'Lambton Tower Unlocked!!' :
                props.route.params.dataFromAR.imageUrl == 'essex' ? 'Essex Hall Unlocked' : ''}
            {/* New building unlocked!!! */}
          </Text>
          <TouchableOpacity style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10 }}
            onPress={() => {
              addUnlockedBuildingToDB(props.route.params.dataFromAR)
              navigation.navigate('Hallway Lookers', { screen: 'PathwayScreen' })
            }}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>
              Go To Pathways
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10 }}
            onPress={() => {
              setCurrentPoints(0)
              setRunning(true)
              gameEngine.swap(entities())
            }}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>
              RESTART GAME
            </Text>
          </TouchableOpacity> */}

        </View> : null}


      {!running && !endGame ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', color: 'red', justifyContent: 'center', alignItems: 'center', fontSize: 40 }}>
            Flappy Birds
          </Text>
          <Text style={{ fontWeight: 'bold', color: 'red', justifyContent: 'center', alignItems: 'center', fontSize: 40 }}>
            Reach 5 points to Win
          </Text>
          <TouchableOpacity style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10 }}
            onPress={() => {
              setCurrentPoints(0)
              setRunning(true)
              gameEngine.swap(entities())
            }}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>
              START GAME
            </Text>
          </TouchableOpacity>

        </View> : null}
    </View>
  );
}

function addUnlockedBuildingToDB(data) {
  console.log("add unlock building", data.imageUrl)
  if (data.imageUrl == 'erie') {
    addUnlockedBuilding(0, "erie").then((snapshot) => {
      console.log("snapshot : ", snapshot)
    })
  }
  else if (data.imageUrl == 'lambton') {
    addUnlockedBuilding(1, "lambton").then((snapshot) => {
      console.log("snapshot : ", snapshot)
    })
  }
  else if (data.imageUrl == 'essex') {
    addUnlockedBuilding(2, "essex").then((snapshot) => {
      console.log("snapshot : ", snapshot)
    })
  }
  //continue from here....add unlocked building in db
}

export default App
