import { useNavigation } from '@react-navigation/core';
import React, { Component } from 'react'
import { auth } from '../firebase';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, Image, Button } from 'react-native';
import {Audio} from 'expo-av';
import image1 from "../assets/lambton_tower.jpg";
import image2 from "../assets/essex_hall.jpg";
import image3 from "../assets/locked.png";
import image4 from "../assets/locked2.jpg";

const HomeScreen = () => {  
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  const tileDimensions = calcTileDimensions(width, 2.01) 


  const [sound, setSound] = React.useState();
  async function soundOn() {
  console.log('Loading Sound');
  const { sound } = await Audio.Sound.createAsync(
     require('../assets/music.mp3')
    );
  setSound(sound);

  console.log('Playing Sound');
  await sound.playAsync();
 }
 React.useEffect(() => {
  return sound
    ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync(); }
    : undefined;
}, [sound]);


  return (
    <View style={styles.container}>
      {data.map(i => Item({ ...tileDimensions, imageObj: i }))}
      <TouchableOpacity
        onPress={handleSignOut}
        style={[styles.button, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>Sign out</Text>
        </TouchableOpacity>  
      <View style={styles.button}>
      <Button title="music on" onPress={soundOn} />
    </View>
    
     
    </View>
    
  ) ;
}

const { width } = Dimensions.get("window");

var data = [
    { id: 1, title: "Lambton Tower", image: image1 },
    { id: 2, title: "Essex Hall", image: image2 },
    { id: 3, title: "Locked Level", image: image3 },
    { id: 4, title: "Locked Level", image: image4 },
]

const Item = ({ size, margin, imageObj }) => (
  imageObj.title != 'Locked Level'
    ?
    <View 
      style={[styles.item, { width: size, height: size, marginHorizontal: margin }]} 
      key={imageObj.id}>
      <Image 
        source={imageObj.image}
        style={{ width: 150, height: 150, position: "absolute", opacity:0.4, backgroundColor:"white" }}
      ></Image>
      <Text style={styles.imageTitle}> {imageObj.title}</Text>
    </View>
    : 
    <View 
      style={[styles.item, { width: size, height: size, marginHorizontal: margin }]} 
      key={imageObj.id}>
      <Image source={imageObj.image}
          style={{ width: 130, height: 130, position: "absolute" }}
      ></Image>
      <Text></Text>
    </View>
)

const calcTileDimensions = (deviceWidth, tpr) => {
  const margin = deviceWidth / (tpr * 10);
  const size = (deviceWidth - margin * (tpr * 2)) / tpr;
  return { size, margin };
}


export default HomeScreen

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
    borderColor: '#9B2226',
    borderRadius:5
  },
  itemText: {
    fontSize: 20
  },
  imageTitle: {
    color: '#9B2226', 
    fontWeight: "bold", 
    marginTop:-20,
    fontSize:16,
  },
  button: {
    backgroundColor: '#9B2226',
    width: '30%',
    marginHorizontal: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    padding: 10,
    borderRadius: 10,
  },
  buttonOutline: {
    backgroundColor: 'white',
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
    color: '#9B2226',
    fontWeight: '700',
    fontSize: 16,
  },
});