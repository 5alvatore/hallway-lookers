import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Icon, TextInput } from 'react-native';
import { bounce } from 'react-native/Libraries/Animated/Easing';
import { Audio } from "expo-av";

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARSceneNavigator,
  ViroBox,
  ViroMaterials,
  ViroAnimations,
  Viro3DObject,
  ViroAmbientLight,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroFlexView,
} from "@viro-community/react-viro";

const InitialScene = (props) => {
  let data = props.sceneNavigator.viroAppProps;
  
  const [imageAsset, setImageAsset] = useState(require('../assets/easter-egg/12172_Egg_v1_l2.obj'))
  const [rotationAsset,setRotationAsset] = useState([180,0,0])
  const [bouncevar,setBouncevar] = useState({name:'rotate',run:false})

  ViroMaterials.createMaterials({
    wood:{
      diffuseTexture:require("../assets/Egg_hatch/12172-Egg_diffuse.jpg")
    }
  })


  ViroAnimations.registerAnimations({
    rotate: {
      duration: 5000,
      properties: {

        // rotateX: "+=360",
        rotateY: "+=360",
        // rotateZ: "+=360"
      },
    },
  });

  ViroARTrackingTargets.createTargets({
    dummyImage: {
      source: require('../assets/biscuit.jpeg'),
      orientation: 'Up',
      physicalWidth: 0.165
    }
  })


  // Adding log and changing conditions once image is detected
  const anchorFound = () => {
    console.log("Anchor / Image detected");
    // playSound();
    soundOn();
  };

  // const [sound, setSound] = React.useState();
  const [audioStatus, setAudioStatus] = useState(false);
  const [sound, setSound] = React.useState(new Audio.Sound());

  async function soundOn() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/ARMusic/SneakyAdventure.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  async function soundOff() {
    console.log("Sound off");
    // await sound.stopAndUnloadAsync();
    await sound.stopAsync();
    await sound.unloadAsync();
  }

  const checkEggHatched = () => {
    if (egghatched == 0){
      setEgghatched(1);
      console.log("Clicked, egg hatched")
      console.log("Show the status: ",egghatched);
      
    }

  }

  return (
    <ViroARScene>
      <ViroFlexView
        height={1}
        width={4.5}
        position={[0, 2, -10]}
        rotation={[360, 0, 0]}
      >
        <ViroFlexView
          backgroundColor={"blue"}
          style={{ flex: 0.8, flexDirection: "row" }}
        >
          <ViroText
            style={{ color: "white", flex: 1 }}
            text={"Welcome to AR !!"}
            fontSize={50}
          />
        </ViroFlexView>
      </ViroFlexView>
      <ViroARImageMarker target="dummyImage" onAnchorFound={anchorFound}>
        <ViroAmbientLight color="#ffffff" />
        <ViroAmbientLight color="#ffffff" />
        <Viro3DObject
          source={imageAsset}
          position={[0, -3, 0]}
          scale={[0.008, 0.008, 0.008]}
          rotation={rotationAsset}
          type="OBJ"
          animation={bouncevar}
          materials={["wood"]}
          onClick={() => {
            soundOff();
            console.log("Hatched");
            //alert("EGG HATCHED");
            setImageAsset(require('../assets/easter-egg/12172_Egg_v1_l2.obj'))
            setBouncevar({name:'rotate',run:true})
            setImageAsset(require('../assets/Egg_hatch/egg_hatched.obj'))
            setRotationAsset([270,0,0])
            console.log('image changed')
            console.log('rotation happen')
           }} >
        </Viro3DObject>
      </ViroARImageMarker>
    </ViroARScene>
  );
};

export default () => {
  const [obj, setObject] = useState("egg");

  return (
    <View style={styles.mainView}>
      <ViroARSceneNavigator
        initialScene={{
          scene: InitialScene,
        }}
        viroAppProps={{ obj: Object }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e90ff",
  },
  mainView: {
    flex: 1,
  },
  controlsView: {
    width: "100%",
    height: 100,
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    margin: 15,
    backgroundColor: "#9d9d9d",
    padding: 10,
    fontWeight: "bold",
  },
});
