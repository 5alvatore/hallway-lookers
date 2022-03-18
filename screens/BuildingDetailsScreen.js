
import { Image,Text, View ,StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import {Platform, Linking} from 'react-native'
const BuildingDeatilsScreen = ({route}) => {
  const {imageObj}  = route.params;
  const navigation = useNavigation()

  const openGps = (lat, lng) => {
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    var url = scheme + `${42.3054223},${-83.0653745}`;
    Linking.openURL(url);
  }
  const handleClose = () => {
    navigation.navigate("Home");
  }
  return(
      <View>
      <Image
            source={imageObj.image}
            resizeMode = 'cover'
            style={{ width: '100%', height: 250,  backgroundColor: "white" }}
          ></Image>
          <Text style={styles.text}>{imageObj.title}</Text>
          <TouchableOpacity
           style={[styles.button, styles.buttonOutline]}
           onPress={openGps}
        >
          <Text  style={styles.buttonOutlineText}>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity
         style={[styles.button, styles.buttonOutline]}
         onPress={handleClose}
        >
          <Text  style={styles.buttonOutlineText}>Close</Text>
        </TouchableOpacity>
    </View>
  )
}

export default BuildingDeatilsScreen

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 27,
    margin:10,
    textAlign:'center'
  },
  buttonOutlineText: {
    color: 'white',
    fontWeight: '700',
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
})
