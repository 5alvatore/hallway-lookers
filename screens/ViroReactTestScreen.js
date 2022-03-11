import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Icon, TextInput } from 'react-native';
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
  ViroFlexView
} from '@viro-community/react-viro';


const InitialScene = (props) => {
  let data = props.sceneNavigator.viroAppProps;
  //let newImage=require("../assets/door.jpeg");
  //const [egghatched,setEgghatched] = useState(0);
  
  const [imageAsset, setImageAsset] = useState(require('../assets/easter-egg/12172_Egg_v1_l2.obj'))
  console.log(imageAsset);

  // const handleImageChange = () => {
  //   setImageAsset(newImage)
  // }


  ViroAnimations.registerAnimations({
    rotate: {
      duration: 2500,
      properties: {
        // rotateX: "+=360",
        rotateY: "+=360",
        // rotateZ: "+=360"
      }
    }
  })

  ViroARTrackingTargets.createTargets({
    dummyImage: {
      source: require('../assets/juice.jpeg'),
      orientation: 'Up',
      physicalWidth: 0.165
    }
  })

  // Adding log and changing conditions once image is detected
  const anchorFound = () => {
    console.log("Anchor / Image detected")
  }

  const checkEggHatched = () => {
    if (egghatched == 0){
      setEgghatched(1);
      console.log("Clicked, egg hatched")
      console.log("Show the status: ",egghatched);
      
    }
    
    // else{
    //   console.log("egg is already hatched")
    // }

  }

  return (
    <ViroARScene>
      <ViroFlexView
          height={1}
          width={4.5}
          position={[0, 2, -10]}
          rotation={[360,0,0]}>
          <ViroFlexView backgroundColor={'blue'} style={{ flex: 0.8, flexDirection: 'row' }} >
            <ViroText
              style={{ color: 'white', flex: 1 }}
              text={'Welcome to AR !!'}
              fontSize={50} />
          </ViroFlexView>
        </ViroFlexView>
      <ViroARImageMarker target="dummyImage" onAnchorFound={anchorFound}>
      <ViroAmbientLight color="#ffffff" />
        <ViroAmbientLight color="#ffffff" />
        <Viro3DObject
          source={imageAsset}
          position={[0, -3, 0]}
          scale={[0.008, 0.008, 0.008]}
          rotation={[180, 0, 0]}
          type="OBJ"
          onClick={() => {
            console.log("Hatched");
            alert("EGG hatched");
            //setImageAsset(require("../assets/door.jpeg"))
            setImageAsset(require('../assets/Egg_hatch/egg_hatched.obj'))
           }} >
        </Viro3DObject>
      </ViroARImageMarker>
    </ViroARScene>
  )
}

export default () => {
  const [obj, setObject] = useState('egg')

  return (
    <View style={styles.mainView}>
      <ViroARSceneNavigator
        initialScene={{
          scene: InitialScene
        }}
        viroAppProps={{ "obj": Object }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e90ff'
  },
  mainView: {
    flex: 1
  },
  controlsView: {
    width: '100%',
    height: 100,
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    margin: 15,
    backgroundColor: '#9d9d9d',
    padding: 10,
    fontWeight: 'bold'
  }
});
