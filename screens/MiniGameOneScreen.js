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
  const [isTimeSaved, setIsTimeSaved] = useState(false)
  const [isTimeSavedForMini, setIsTimeSavedForMini] = useState(false)
  const [miniStartTime, setMiniStartTime] = useState(0)
  const [isHotspotTimeSaved, setIsHotspotTimeSaved] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    setRunning(false)
  }, [])

  // function to get the start time for the mini game
  const getstartTime = () => {
    console.log("is time saved??", isTimeSavedForMini)

    if (!isTimeSavedForMini) {
      let currentTime = Date.now()
      console.log("Current time is ", currentTime)
      setMiniStartTime(currentTime)
      setIsTimeSavedForMini(true)

    }
  }
  // function to get the mini game completed time
  const getGameTime = () => {
    let currentTime = Date.now()
    if (endGame) {
      return (currentTime - miniStartTime)
    }
  }

  // function to store last time for each hotspot
  const storeTimeForHotspot = () => {
    // store time for erie building
    if (props.route.params.dataFromAR.imageUrl == 'erie') {
      if (!setIsHotspotTimeSaved) {
        let currentTime = Date.now()
        console.log("Current time is ", currentTime)

        user = auth.currentUser;
        //console.log("user is", user)
        const reference = database.ref();
        if (user) {
          reference.child("users").child(user.uid).child("pathway1timer").get().then((snapshot) => {
            if (snapshot.exists()) {
              // update the hotspot0 timer
              reference.child("users").child(user.uid).child("pathway1timer").update({
                hotspot0: getGameTime
              })
              console.log("Total time taken for mini game", snapshot.val().hotspot0)
              setIsHotspotTimeSaved(true);
            }
          })
        }
      }
    }
    // store time for lambton building
    else if (props.route.params.dataFromAR.imageUrl == 'lambton') {
      if (!setIsHotspotTimeSaved) {
        let currentTime = Date.now()
        console.log("Current time is ", currentTime)

        user = auth.currentUser;
        //console.log("user is", user)
        const reference = database.ref();
        if (user) {
          reference.child("users").child(user.uid).child("pathway1timer").get().then((snapshot) => {
            if (snapshot.exists()) {
              // update the hotspot0 timer
              reference.child("users").child(user.uid).child("pathway1timer").update({
                hotspot1: getGameTime
              })
              console.log("Total time taken for mini game", snapshot.val().hotspot1)
              setIsHotspotTimeSaved(true);
            }
          })
        }
      }
    }
    // store time for essex building
    else if (props.route.params.dataFromAR.imageUrl == 'essex') {
      if (!setIsHotspotTimeSaved) {
        let currentTime = Date.now()
        console.log("Current time is ", currentTime)

        user = auth.currentUser;
        //console.log("user is", user)
        const reference = database.ref();
        if (user) {
          reference.child("users").child(user.uid).child("pathway1timer").get().then((snapshot) => {
            if (snapshot.exists()) {
              // update the hotspot0 timer
              reference.child("users").child(user.uid).child("pathway1timer").update({
                hotspot2: getGameTime
              })
              console.log("Total time taken for mini game", snapshot.val().hotspot2)
              setIsHotspotTimeSaved(true);
            }
          })
        }
      }
    }
  }

  // function to store last time for pathway 1
  const getlastTimeForPathway1 = () => {
    if (props.route.params.dataFromAR.imageUrl == 'essex') {
      // if already time saved in firebase, don't save
      console.log("is time saved??", isTimeSaved)

      if (!isTimeSaved) {
        let currentTime = Date.now()
        console.log("Current time is ", currentTime)

        user = auth.currentUser;
        //console.log("user is", user)
        const reference = database.ref();
        if (user) {
          reference.child("users").child(user.uid).child("pathway1timer").get().then((snapshot) => {
            if (snapshot.exists()) {
              // update the pathway timer
              const pathwayend = snapshot.val().pathwayend
              const pathwaystart = snapshot.val().pathwaystart
              console.log("Pathway end time", snapshot.val().pathwayend)
              console.log("Pathway start time", snapshot.val().pathwaystart)
              reference.child("users").child(user.uid).child("pathway1timer").update({
                pathwayend: currentTime
              })
              reference.child("users").child(user.uid).child("pathway1timer").update({
                totaltime: (pathwayend - pathwaystart)
              })
              console.log("Total pathway time taken", snapshot.val().totaltime)
              setIsTimeSaved(true);
            }
          })
        }
      }
    }
  }

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
            {props.route.params.dataFromAR.imageUrl == 'erie' ? 'Lambton Tower Unlocked!!' :
              props.route.params.dataFromAR.imageUrl == 'lambton' ? 'Essex Hall Unlocked!!' :
                props.route.params.dataFromAR.imageUrl == 'essex' ? 'Pathway Completed!!' : ''}
            {storeTimeForHotspot()}
            {getGameTime}
            {getlastTimeForPathway1()}
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
              { getstartTime() }
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
    addUnlockedBuilding(1, "lambton").then((snapshot) => {
      console.log("snapshot : ", snapshot)
    })
  }
  else if (data.imageUrl == 'lambton') {
    addUnlockedBuilding(2, "essex").then((snapshot) => {
      console.log("snapshot : ", snapshot)
    })
  }
  //continue from here....add unlocked building in db
}

export default App
