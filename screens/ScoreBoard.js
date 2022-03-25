import React, { Component } from "react";
import { View, Alert, Text } from "react-native";
import { auth, database } from '../firebase';
import Leaderboard from "react-native-leaderboard";
var user = null;
//var userscore= null;
export default class AvatarAndClickable extends Component {
  constructor() {
    super();
    // this.userscore = []
    this.state = { userscore:[] }
    console.log("this", this.state)
    // unlocked_buildings: []
  };
  //}
  // this.userscore=[{'name':'abc'},{'score':0}]
  // this.state = {
  //   //data: DATA
  //   name: null,
  //   score: null
  // };

  componentDidMount() {
    // simulate new users being added to leaderboard
    // setInterval(() => {
    //   const newData = {
    //     name: "New User Data!!",
    //     score: Math.floor(Math.random() * 100).toString(),
    //     iconUrl:
    //       "https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png"
    //   };
    //   this.setState({ data: this.state.data.concat(newData) });
    // }, 3000);
    user = auth.currentUser;
    console.log("user is", user)
    const reference = database.ref();
    if (user) {
      reference.child("users").child(user.uid).get().then((snapshot) => {
        if (snapshot.exists()) {
          console.log("snapshot : ",snapshot)
          userscore=[]
          //unlocked_buildings = []
          //score = 0
          if (snapshot.val().score >= 0) {
            userscore.push({
              'name': snapshot.val().name,
              'score': snapshot.val().score
            })
            console.log("snapshot value", snapshot.val().score)
            console.log("undescore array : ",userscore)
            this.setState({ userscore: userscore })
            // for (let i = 0; i < snapshot.val().unlocked_buildings.length; i++) {
            //   let title_string_array = ((snapshot.val().unlocked_buildings[i]).split("_"))
            //   title_string_array.pop()
            //   let title = title_string_array.join(" ")
            //   unlocked_buildings.push({ id: i + 1, title: title, image: snapshot.val().unlocked_buildings[i] })
            // }
            // score.on('value', function (snapshot) {
            //   console.log(snapshot.val())
            // });
          }
          else {
            //unlocked_buildings = []
            console.log("else command")
          }


          // for (let i = unlocked_buildings.length; i < 4; i++) {
          //   unlocked_buildings.push({ id: i + 1, title: 'Locked Level', image: 'locked_level' })
          // }
          // console.log(unlocked_buildings)
          // this.setState({ unlocked_buildings: unlocked_buildings })
          //this.setState({ userscore: userscore })
        }
        else {
          console.log("No data available");
        }

      }).catch((error) => {
        console.error(error);
      });
      //this.setState({ userscore: userscore })
    }
  }
  // getdata(){
  // console.log("to get data")
  // }
  // alert = (title, body) => {
  //   Alert.alert(title, body, [{ text: "OK", onPress: () => { } }], {
  //     cancelable: false
  //   });
  // };

  render() {
    const { userscore } = this.state
    console.log("userscore from render : ",userscore)
    // console.log("name is ",userscore[0].name);
    // console.log("score is ",userscore[0].score);
    // console.log("state data",this.state);
    const props = {
      labelBy: "name",
      sortBy: "score",
      data: userscore,
      //data: { userscore },
      // name: userscore[0].name,
      // score : userscore[0].score,
      //icon: "iconUrl",
      onRowPress: (item, index) => {
        this.alert(item.name + " clicked", item.score + " points, wow!");
      },
      evenRowColor: "#edfcf9"
    };

    return (
      <View style={{ flex: 1 }}>
        {/* Ghetto Header */}
        <View
          style={{
            paddingTop: 50,
            backgroundColor: "black",
            alignItems: "center"
          }}
        >
          <Text style={{ fontSize: 30, color: "white", paddingBottom: 10 }}>
            Scoreboard
          </Text>
        </View>
        <Leaderboard {...props} />
      </View>
    );
  }
}


const DATA = [
  {
    name: "We Tu Lo",
    score: null,
    iconUrl:
      "https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094043-stock-illustration-profile-icon-male-avatar.jpg"
  },
  {
    name: "Adam Savage",
    score: 12,
    iconUrl:
      "https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png"
  },
  {
    name: "Derek Black",
    score: 244,
    iconUrl: "http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png"
  },
  {
    name: "Erika White",
    score: 0,
    iconUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr27ZFBaclzKcxg2FgJh6xi3Z5-9vP_U1DPcB149bYXxlPKqv-"
  },
  {
    name: "Jimmy John",
    score: 20,
    iconUrl: "https://static.witei.com/static/img/profile_pics/avatar4.png"
  },
  {
    name: "Joe Roddy",
    score: 69,
    iconUrl: "https://static.witei.com/static/img/profile_pics/avatar4.png"
  },
  {
    name: "Ericka Johannesburg",
    score: 101,
    iconUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz"
  },
  {
    name: "Tim Thomas",
    score: 41,
    iconUrl: "http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png"
  },
  {
    name: "John Davis",
    score: 80,
    iconUrl:
      "https://cdn.dribbble.com/users/223408/screenshots/2134810/me-dribbble-size-001-001_1x.png"
  },
  {
    name: "Tina Turner",
    score: 22,
    iconUrl:
      "https://cdn.dribbble.com/users/223408/screenshots/2134810/me-dribbble-size-001-001_1x.png"
  },
  {
    name: "Harry Reynolds",
    score: null,
    iconUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsSlzi6GEickw2Ft62IdJTfXWsDFrOIbwXhzddXXt4FvsbNGhp"
  },
  {
    name: "Betty Davis",
    score: 25,
    iconUrl:
      "https://landofblogging.files.wordpress.com/2014/01/bitstripavatarprofilepic.jpeg?w=300&h=300"
  },
  {
    name: "Lauren Leonard",
    score: 30,
    iconUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr27ZFBaclzKcxg2FgJh6xi3Z5-9vP_U1DPcB149bYXxlPKqv-"
  }
];