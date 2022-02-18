import { StatusBar, useState } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Dimensions, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';

const { width } = Dimensions.get("window");
const image1 = require('./assets/lambton_tower.jpg')
const image2 = require('./assets/essex_hall.jpg')
const image3 = require('./assets/locked_level_4_preview_rev_2.jpeg')
// const image3 = require('./assets/locked_level_3.jpg')


var data = [
  { id: 1, title: "Lambton Tower", image: image1 },
  { id: 2, title: "Essex Hall", image: image2 },
  { id: 3, title: "Locked Level", image: image3 },
  { id: 4, title: "Locked Level", image: image3 },
  { id: 5, title: "Locked Level", image: image3 },
  { id: 6, title: "Locked Level", image: image3 },
  // { id: 7, title: "Locked Level", image: image3 },
  // { id: 8, title: "Locked Level", image: image3 }
]

const Item = ({ size, margin, imageObj }) => (
  // <View style={[styles.item, { width: size, height: size, marginHorizontal: margin }]} key={imageObj.id}>
  /* <Image source={imageObj.image} 
  style={{ width: 150, height: 150,position: "absolute",}}
  >
  </Image> */

  // {
  imageObj.title != 'Locked Level'
    ?
    <View style={[styles.item, { width: size, height: size, marginHorizontal: margin }]} key={imageObj.id}>
      <Image 
      source={imageObj.image}
        style={{ width: 150, height: 150, position: "absolute", opacity:0.3, backgroundColor:"white" }}
      >
      </Image>
      <Text style={{ color: '#EE9B00', fontWeight: "bold", marginTop:-20,fontSize:16 }}> {imageObj.title}</Text>
    </View>
    : 
    <View style={[styles.item1, { width: size, height: size, marginHorizontal: margin }]} key={imageObj.id}>
      <Image source={imageObj.image}
        style={{ width: 130, height: 130, position: "absolute" }}
      >
      </Image>
      <Text></Text>
    </View>
  // }
  // </View>
)

const calcTileDimensions = (deviceWidth, tpr) => {
  const margin = deviceWidth / (tpr * 10);
  const size = (deviceWidth - margin * (tpr * 2)) / tpr;
  return { size, margin };
};


function HomeScreen() {

  const tileDimensions = calcTileDimensions(width, 2)  // -> change this number and see!
  // const tiles = '1 2 3 4 5 6 7 8'.split(' ')

  return (
    <View style={styles.container}>
      {/* {tiles.map(i => Item({ ...tileDimensions, text: i }))} */}
      {data.map(i => Item({ ...tileDimensions, imageObj: i }))}

    </View>
  );


}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}


const navTheme = {
  colors: {
    background: '#001219',
  },
};

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#8e9aaf' },
          headerTintColor: '#161a1d'
        }}>
        <Stack.Screen name="Home" component={HomeScreen}
          options={{
            title: 'HALLWAY LOOKERS',
            headerTitleStyle: { fontWeight: "bold" }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  container: {
    justifyContent: "flex-start", flexDirection: "row", flexWrap: "wrap", marginTop: 60,
    overflow: 'scroll',
    // backgroundColor: '#5632a8'
  },
  item: {
    // backgroundColor: 'yellow',
    alignSelf: "flex-start",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    marginBottom: 80,
    // borderWidth: 4,
    // borderColor: '#EE9B00'
  },
  item1: {
    // backgroundColor: 'yellow',
    alignSelf: "flex-start",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    marginBottom: 80,
    borderWidth: 2,
    borderColor: '#CA6702',
    borderRadius:5
  },
  itemText: {
    fontSize: 20
  }
});
