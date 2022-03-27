import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { getUserInfo, getUnlockedBuildingData } from '../services/getDataFromFirebase';

var user = null;
var unlocked_buildings = []

const imagePaths = {
  locked_level: require('../assets/locked.png'),
  essex: require('../assets/timeline/buildings/essexhall.jpg'),
  lambton: require('../assets/timeline/buildings/lambtontower.jpg'),
  erie: require('../assets/timeline/buildings/eriehall.jpg'),
}

const { width } = Dimensions.get("window");


const Item = ({ size, margin, imageObj }) => (
  imageObj.title != 'Locked Level'
    ?
    <View
      style={[styles.item, { width: size, height: size, marginHorizontal: margin }]}
      key={imageObj.id}>
      <Image
        source={imagePaths[imageObj.image]}
        style={{ width: 150, height: 150, position: "absolute", opacity: 0.3, backgroundColor: "white" }}
      ></Image>
      <Text style={styles.imageTitle}> {imageObj.title}</Text>
    </View>
    :
    <View
      style={[styles.item, { width: size, height: size, marginHorizontal: margin }]}
      key={imageObj.id}>
      <Image source={imagePaths[imageObj.image]}
        style={{ width: 130, height: 130, position: "absolute" }}
      ></Image>
      <Text></Text>
    </View>
)

const calcTileDimensions = (deviceWidth, tpr) => {
  const margin = deviceWidth / (tpr * 10);
  const size = (deviceWidth - margin * (tpr * 2)) / tpr;
  return { size, margin };
};

export default class PathwayScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      unlocked_buildings: []
    };
  }

  componentDidMount() {
    user = getUserInfo();
    // console.log("user : ", user)
    if (user) {
      getUnlockedBuildingData(user).then((snapshot) => {
        if (snapshot.exists()) {
          unlocked_buildings = []
          if (snapshot.val().unlocked_buildings != undefined &&
            snapshot.val().unlocked_buildings.length > 0) {
            for (let i = 0; i < snapshot.val().unlocked_buildings.length; i++) {
              let title_string_array = ((snapshot.val().unlocked_buildings[i]).split("_"))
              title_string_array.pop()
              let title = title_string_array.join(" ")
              unlocked_buildings.push({ id: i + 1, title: snapshot.val().unlocked_buildings[i], image: snapshot.val().unlocked_buildings[i] })
            }
          }
          else {
            unlocked_buildings = []
          }

          for (let i = unlocked_buildings.length; i < 4; i++) {
            unlocked_buildings.push({ id: i + 1, title: 'Locked Level', image: 'locked_level' })
          }
          // console.log(unlocked_buildings)
          this.setState({ unlocked_buildings: unlocked_buildings })

        } else {
          console.log("No data available");
        }
      })
      .catch((error) => console.log(error))

    }
  }

  render() {
    const { unlocked_buildings } = this.state;
    // console.log(unlocked_buildings);

    const tileDimensions = calcTileDimensions(width, 2.01);

    return (
      <View style={styles.container}>
        {unlocked_buildings.map(i => Item({ ...tileDimensions, imageObj: i }))}
      </View>
    )
  }
}

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