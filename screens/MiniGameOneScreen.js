import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from '../entities';
import Physics from '../utils/physics';
import { useNavigation } from '@react-navigation/core'
import { addUnlockedBuilding, getUserInfo } from '../services/getDataFromFirebase';

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
              // update the hotspot1 timer
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
              // update the hotspot2 timer
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
              // Pathway1 was calculated during the PathwayDetailsOneScreen
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

  // develop Pathway point logic
  const calculatePathwayPoints = (timetaken, score) => {
    // min and max are in milliseconds, min is 30 minutes and max is 45 minutes
    let min = 1800000, max = 2700000
    if (score == undefined) {
      score = 0
    }
    if (timetaken <= min) {
      score += 10;
    }
    else if (timetaken >= min && timetaken <= max) {
      score += 5;
    }
    else {
      score -= 1
    }
    return score
  }

  // develop hotspot point logic
  const calculateHotspotPoints = (timetaken, score) => {
    // min and max are in milliseconds, min is 10 seconds and max is 1 minute
    let min = 10000, max = 60000
    if (score == undefined) {
      score = 0
    }
    if (timetaken <= min) {
      score += 10;
    }
    else if (timetaken >= min && timetaken <= max) {
      score += 5;
    }
    else {
      score -= 1
    }
    return score
  }

  // store pathway totaltime in a variable
  const getTotalTime = () => {
    user = getUserInfo()
    if (user) {
      // get the pathway1 totaltime and calculate points accordingly
      reference.child("users").child(user.uid).get("pathway1timer").get().then((snapshot) => {
        if (snapshot.exists()) {
          const totaltime = snapshot.val().totaltime;
          return totaltime
        }
      })
    }
  }

  // store pathway userscore in a variable
  const getUserScore = () => {
    user = getUserInfo()
    if (user) {
      reference.child("users").child(user.uid).get().then((snapshot) => {
        if (snapshot.exists()) {
          const userscore = snapshot.val().score;
          return userscore
        }
      })
    }
  }

  // to calculate the pathway points of a game and setting it in score
  const calculatePoints = () => {
    totaltime = getTotalTime() // get time for pathway 1
    userscore = getUserScore() // get current score for pathway 1

    // calculate score logic based on timer
    const pathwayscorecalculated = calculatePathwayPoints(totaltime, userscore)
    reference.child("users").child(user.uid).update({
      score: pathwayscorecalculated
    })
  }

  // get time for each mini game played
  const getHotTime = (hotspot_index) => {
    user = getUserInfo()
    if (hotspot_index == 0){
      // get time for hotspot 0
      if (user){
        reference.child("users").child(user.uid).get("pathway1timer").get().then((snapshot) => {
          if (snapshot.exists()) {
            const totaltime = snapshot.val().hotspot0;
            return totaltime
          }
        })
      }
    }
    else if (hotspot_index == 1){
      // get time for hotspot 1
      if (user){
        reference.child("users").child(user.uid).get("pathway1timer").get().then((snapshot) => {
          if (snapshot.exists()) {
            const totaltime = snapshot.val().hotspot1;
            return totaltime
          }
        })
      }
    }
    else{
      // get time for hotspot 2
      if (user){
        reference.child("users").child(user.uid).get("pathway1timer").get().then((snapshot) => {
          if (snapshot.exists()) {
            const totaltime = snapshot.val().hotspot2;
            return totaltime
          }
        })
      }
    }
  }

  // to calculate the hotspot points of a game
  const calculateHotPoints = () => {
    userscore = getUserScore()
    if (props.route.params.dataFromAR.imageUrl == 'erie'){
      totaltime = getHotTime(0)
    }
    else if (props.route.params.dataFromAR.imageUrl == 'lambton'){
      totaltime = getHotTime(1)
    }
    else {
      totaltime = getHotTime(2)
    }
    const hotspotscorecalculated = calculateHotspotPoints(totaltime,userscore)
    reference.child("users").child(user.uid).update({
      score: hotspotscorecalculated
    })
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

            {/* function to store time taken for current hotspot */}
            {storeTimeForHotspot()} 
            {/* function to calculate time taken to complete a pathway */}
            {getlastTimeForPathway1()}
            {/* function to calculate points scored in a particular pathway */}
            {calculatePoints()}
            {/* function to calculate points scored in a particular hotspot */}
            {calculateHotPoints()}
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
