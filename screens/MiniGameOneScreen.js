import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from '../entities';
import Physics from '../utils/physics';

export default function App() {
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentPoints, setCurrentPoints] = useState(0)
  const [endGame, setEndGame] = useState(false)
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
              if(currentPoints == 2){
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
          <Text style={{ fontWeight: 'bold', color: 'red', fontSize: 40 }}>
              YOU WON!!!
          </Text>
          <TouchableOpacity style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10 }}
            onPress={() => {
              setCurrentPoints(0)
              setRunning(true)
              gameEngine.swap(entities())
            }}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>
              RESTART GAME
            </Text>
          </TouchableOpacity>

        </View> : null}


      {!running && !endGame ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', color: 'red', justifyContent: 'center', alignItems: 'center',fontSize: 40 }}>
              Flappy Birds
          </Text>
          <Text style={{ fontWeight: 'bold', color: 'red', justifyContent: 'center', alignItems: 'center',fontSize: 40 }}>
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
