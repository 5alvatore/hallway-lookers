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
import { bounce } from "react-native/Libraries/Animated/Easing";
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
import Images from "../assets/index";

export default class ViroReactTestScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      obj: "egg",
    };
    show2D = true;
  }

  render() {
    // const [obj, setObject] = useState('egg')
    const datafromPathway = this.props.route.params.datafromPathway;
    const { obj } = this.state;
    return (
      <View style={styles.mainView}>
        <ViroARSceneNavigator
          initialScene={{
            scene: this.InitialScene,
          }}
          viroAppProps={{
            obj: Object,
            datafromPathway: datafromPathway,
            show2D: true,
          }}
          style={{ flex: 1 }}
        />
        {/* <TouchableOpacity style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10 }}
            onPress={() => {
              this.props.navigation.navigate('MiniGameOne', { dataFromAR: datafromPathway  })
            }}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>
              Go To MiniGame
            </Text>
          </TouchableOpacity> */}
      </View>
    );
  }

  /**
   *
   * @param {any} props
   * @returns {ViroARScene} AR scene
   */

  InitialScene = (props) => {
    let data = props.sceneNavigator.viroAppProps;
    // console.log("data :", data)
    let hotspotData = data.datafromPathway;
    console.log("hotspot data : ", hotspotData);
    show2D = data.show2D;

    const [imageAsset, setImageAsset] = useState(
      require("../assets/easter-egg/12172_Egg_v1_l2.obj")
    );
    const [rotationAsset, setRotationAsset] = useState([0, 180, 0]);
    const [bouncevar, setBouncevar] = useState({ name: "rotate", run: false });

    ViroMaterials.createMaterials({
      wood: {
        diffuseTexture: require("../assets/Egg_hatch/12172-Egg_diffuse.jpg"),
      },
    });

    ViroAnimations.registerAnimations({
      rotate: {
        duration: 2500,
        properties: {
          rotateY: "+=360",
        },
      },
    });

    ViroARTrackingTargets.createTargets({
      hotspotImage: {
        source: Images.image_recognition[hotspotData.imageUrl],
        orientation: "Up",
        physicalWidth: 0.165,
      },
    });

    if (hotspotData.title == "Erie Hall") {
      ViroARTrackingTargets.createTargets({
        buildingImage: {
          source: Images.image_recognition["Erie_Hall_building"],
          orientation: "Up",
          physicalWidth: 0.165,
        },
      });
    } else if (hotspotData.title == "Lambton Tower") {
      ViroARTrackingTargets.createTargets({
        buildingImage: {
          source: Images.image_recognition["Lambton_building"],
          orientation: "Up",
          physicalWidth: 0.165,
        },
      });
    } else if (hotspotData.title == "Essex Hall") {
      ViroARTrackingTargets.createTargets({
        buildingImage: {
          source: Images.image_recognition["Essex_Hall_building"],
          orientation: "Up",
          physicalWidth: 0.165,
        },
      });
    }

    console.log();

    return (
      <ViroARScene>
        <ViroARImageMarker
          target="buildingImage"
          onAnchorFound={(anchor) => this.anchorFound(anchor, "show2DObject")}
        >
          <ViroText
            text={
              hotspotData.title == "Erie Hall"
                ? "Erie Hall"
                : hotspotData.title == "Lambton Tower"
                ? "Lambton Tower"
                : hotspotData.title == "Essex Hall"
                ? "Essex Hall"
                : ""
            }
            color="red"
            style={{
              fontSize: 30,
              color: "blue",
            }}
            rotation={[270, 360, 0]}
            scale={[0.1, 0.1, 0.1]}
            outerStroke={{ type: "Outline", width: 1, color: "black" }}
          />
        </ViroARImageMarker>

        <ViroARImageMarker
          target="hotspotImage"
          onAnchorFound={(anchor) => this.anchorFound(anchor, "show3DObject")}
        >
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
              console.log("egg appeared");
              setImageAsset(
                require("../assets/easter-egg/12172_Egg_v1_l2.obj")
              );
              setBouncevar({ name: "rotate", run: true });
              setImageAsset(require("../assets/Egg_hatch/egg_hatched.obj"));
              setRotationAsset([270, 0, 0]);
              setTimeout(() => {
                this.gotToMiniGame(hotspotData);
              }, 2000);
            }}
          ></Viro3DObject>
        </ViroARImageMarker>
      </ViroARScene>
    );
  };

  // Adding log once image is detected
  anchorFound = (anchor, showObject) => {
    console.log("Anchor / Image detected", showObject);
    if (showObject == "show3DObject") {
      show2D = false;
    }
    this.render();
  };

  gotToMiniGame = (hotspotData) => {
    console.log("going to mini game");
    this.props.navigation.navigate("MiniGameOne", { dataFromAR: hotspotData });
  };
}
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
