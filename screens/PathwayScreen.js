import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { auth } from '../firebase';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';
import image1 from "../assets/timeline/buildings/lambtontower.jpg";
import image2 from "../assets/timeline/buildings/essexhall.jpg";
import image3 from "../assets/timeline/buildings/eriehall.jpg";
import image4 from "../assets/locked2.jpg";
import { database } from '../firebase';

const PathwayScreen = () => {

  const navigation = useNavigation()

  // const handleSignOut = () => {
  //   auth
  //     .signOut()
  //     .then(() => {
  //       navigation.replace("Login")
  //     })
  //     .catch(error => alert(error.message))
  // }

  const tileDimensions = calcTileDimensions(width, 2.01)
  const goToDemoScreen = () => {
    navigation.replace("ViroReactTest");
  }

  // const goToMiniGameScreen = () => {
  //   navigation.replace("MiniGameOne");
  // }


  function PathwayPage() {
    return (
      <View style={styles.container}>
        {data.map(i => Item({ ...tileDimensions, imageObj: i }))}
        {/* <TouchableOpacity
          onPress={handleSignOut}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign out</Text>
        </TouchableOpacity> */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data.map(i => Item({ ...tileDimensions, imageObj: i }))}

      {/* <TouchableOpacity
        onPress={goToDemoScreen}
        style={[styles.button, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>AR Demo</Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity
        onPress={goToMiniGameScreen}
        style={[styles.button, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>Mini Game</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSignOut}
        style={[styles.button, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>Sign out</Text>
      </TouchableOpacity> */}

    </View>
  );
}

const { width } = Dimensions.get("window");

var data = [
  { id: 1, title: "Lambton Tower", image: image1, description: "This is lambton tower of university of windsor and it belongs to school of computer science and is the tallest building in the university campus", lat: 42.3054223, lng: -83.0653745, label:"Lambton Tower" },
  { id: 2, title: "Essex Hall", image: image2, description: "This is Essex hall of University of Windsor and it has many classes. The classes of course Master's in applied Computing are held here in this building",  lat: 42.305059770649, lng: -83.06676376513025, label:"Essex Hall" },
  { id: 3, title: "Erie Hall", image: image3, description: "This is Erie hall of University of Windsor and is situated right next to the lambton tower",  lat: 42.3051877, lng: -83.06529876703638, label:"Erie Hall" },
  { id: 4, title: "Locked Level", image: image4 },
]

const Item = ({ size, margin, imageObj }) => {

  const navigation = useNavigation()
  const goToDetailScreen = (params) => {
    navigation.navigate("BuildingDetail", {imageObj : params});
  }

  return imageObj.title != 'Locked Level'
    ?
    <TouchableOpacity
      style={[styles.item, { width: size, height: size, marginHorizontal: margin }]}
      key={imageObj.id}
      onPress={()=>goToDetailScreen(imageObj)}>
      <Image
        source={imageObj.image}
        style={{ width: 150, height: 150, position: "absolute", opacity: 0.3, backgroundColor: "white" }}
      ></Image>
      <Text style={styles.imageTitle}> {imageObj.title}</Text>
    </TouchableOpacity>
    :
    <View
      style={[styles.item, { width: size, height: size, marginHorizontal: margin }]}
      key={imageObj.id}>
      <Image source={imageObj.image}
        style={{ width: 130, height: 130, position: "absolute" }}
      ></Image>
      <Text></Text>
    </View>

}

const calcTileDimensions = (deviceWidth, tpr) => {
  const margin = deviceWidth / (tpr * 10);
  const size = (deviceWidth - margin * (tpr * 2)) / tpr;
  return { size, margin };
};

export default PathwayScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 60,
    overflow: 'scroll',
  },
  item1: {
    alignSelf: "flex-start",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    marginBottom: 80,
  },
  item: {
    alignSelf: "flex-start",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    marginBottom: 80,
    borderWidth: 2,
    borderColor: '#eddcd2',
    borderRadius: 4
  },
  itemText: {
    fontSize: 20
  },
  imageTitle: {
    color: 'white',
    fontWeight: "bold",
    marginTop: -20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#941b0c',
    width: '30%',
    marginHorizontal: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    padding: 10,
    borderRadius: 10,
  },
  buttonOutline: {
    backgroundColor: '#941b0c',
    marginTop: 5,
    borderColor: '#9B2226',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});