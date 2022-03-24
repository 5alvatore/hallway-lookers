import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Icon,
  TextInput,
} from "react-native";
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

  ViroAnimations.registerAnimations({
    rotate: {
      duration: 2500,
      properties: {
        // rotateX: "+=360",
        rotateY: "+=360",
        // rotateZ: "+=360"
      },
    },
  });

  ViroARTrackingTargets.createTargets({
    dummyImage: {
      source: require("../assets/juice.jpeg"),
      orientation: "Up",
      physicalWidth: 0.165,
    },
  });

  // Adding log once image is detected
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

  // React.useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.stopAsync();
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [audioStatus]);

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
          source={require("../assets/easter-egg/12172_Egg_v1_l2.obj")}
          position={[0, -3, 0]}
          scale={[0.008, 0.008, 0.008]}
          rotation={[180, 0, 0]}
          type="OBJ"
          onClick={() => {
            // setAudioStatus(!audioStatus);
            soundOff();
          }}
        />
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
