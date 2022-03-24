import { useNavigation } from "@react-navigation/core";
import React from "react";
import { auth } from "../firebase";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  MapView,
} from "react-native";
import image1 from "../assets/Lambton_Tower_uow.jpg";
import image2 from "../assets/Essex_Hall_uow.jpg";
import image3 from "../assets/locked.png";
import image4 from "../assets/locked2.jpg";
import { database } from "../firebase";

var user = null;
var unlocked_buildings = [];

const imagePaths = {
  Lambton_Tower_uow: require("../assets/Lambton_Tower_uow.jpg"),
  Essex_Hall_uow: require("../assets/Essex_Hall_uow.jpg"),
  locked_level: require("../assets/locked.png"),
};

const { width } = Dimensions.get("window");

const Item = ({ size, margin, imageObj }) =>
  imageObj.title != "Locked Level" ? (
    <TouchableOpacity
      onPress={() =>
        this.props.navigation.navigate("buildingdetailscreen", {
          datafromPathway: imageObj.image,
        })
      }
      key={imageObj.id + imageObj.image + "01"}
    >
      <View
        style={[
          styles.item,
          { width: size, height: size, marginHorizontal: margin },
        ]}
        key={imageObj.id}
      >
        <Image
          source={imagePaths[imageObj.image]}
          style={{
            width: 100,
            height: 100,
            position: "absolute",
            opacity: 0.3,
            backgroundColor: "white",
          }}
        ></Image>
        <Text style={styles.imageTitle}> {imageObj.title}</Text>
      </View>
    </TouchableOpacity>
  ) : (
    <View
      style={[
        styles.item,
        { width: size, height: size, marginHorizontal: margin },
      ]}
      key={imageObj.id}
    >
      <Image
        source={imagePaths[imageObj.image]}
        style={{ width: 80, height: 80, position: "absolute" }}
      ></Image>
      <Text></Text>
    </View>
  );

const calcTileDimensions = (deviceWidth, tpr) => {
  const margin = deviceWidth / (tpr * 10);
  const size = (deviceWidth - margin * (tpr * 2)) / tpr;
  return { size, margin };
};

// const navigation = useNavigation();

const handleSignOut = () => {
  auth
    .signOut()
    .then(() => {
      navigation.replace("Login");
    })
    .catch((error) => alert(error.message));
};

// const tileDimensions = calcTileDimensions(width, 2.01)
const goToDemoScreen = () => {
  navigation.replace("ViroReactTest");
};

const goToMiniGameScreen = () => {
  navigation.replace("MiniGameOne");
};

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      unlocked_buildings: [],
    };
  }

  componentDidMount() {
    user = auth.currentUser;
    const reference = database.ref();
    if (user) {
      reference
        .child("users")
        .child(user.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            unlocked_buildings = [];
            if (
              snapshot.val().unlocked_buildings != undefined &&
              snapshot.val().unlocked_buildings.length > 0
            ) {
              for (
                let i = 0;
                i < snapshot.val().unlocked_buildings.length;
                i++
              ) {
                let title_string_array = snapshot
                  .val()
                  .unlocked_buildings[i].split("_");
                title_string_array.pop();
                let title = title_string_array.join(" ");
                unlocked_buildings.push({
                  id: i + 1,
                  title: title,
                  image: snapshot.val().unlocked_buildings[i],
                });
              }
            } else {
              unlocked_buildings = [];
            }

            for (let i = unlocked_buildings.length; i < 6; i++) {
              unlocked_buildings.push({
                id: i + 1,
                title: "Locked Level",
                image: "locked_level",
              });
            }
            console.log(unlocked_buildings);
            this.setState({ unlocked_buildings: unlocked_buildings });
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    // const handleSignOutNew = handleSignOut();
    // const goToDemoScreenNew = goToDemoScreen();
    // const goToMiniGameScreenNew = goToMiniGameScreen();

    const { unlocked_buildings } = this.state;
    console.log(unlocked_buildings);

    const tileDimensions = calcTileDimensions(width, 3);

    return (
      <View style={styles.container}>
        {unlocked_buildings.map((i) =>
          Item({ ...tileDimensions, imageObj: i })
        )}
        <TouchableOpacity
          // onPress={goToDemoScreen}
          onPress={() => this.props.navigation.navigate("ViroReactTest")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>AR Demo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={goToMiniGameScreen}
          onPress={() => this.props.navigation.navigate("MiniGameOne")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Mini Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            auth
              .signOut()
              .then(() => {
                this.props.navigation.navigate("Login");
              })
              .catch((error) => alert(error.message))
          }
          // onPress={handleSignOut}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 60,
    overflow: "scroll",
  },
  item1: {
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    marginBottom: 80,
  },
  item: {
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    marginBottom: 80,
    borderWidth: 2,
    borderColor: "#eddcd2",
    borderRadius: 4,
  },
  itemText: {
    fontSize: 20,
  },
  imageTitle: {
    color: "white",
    fontWeight: "bold",
    marginTop: -20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#941b0c",
    width: "30%",
    marginHorizontal: 130,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    padding: 10,
    borderRadius: 10,
  },
  buttonOutline: {
    backgroundColor: "#941b0c",
    marginTop: 5,
    borderColor: "#9B2226",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
