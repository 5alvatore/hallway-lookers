import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

export default function Music() {
  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../assets/music.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  // React.useEffect(() => {
  //   return sound
      const soundOff = () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
  //     : undefined;
  // }, [sound]);  
  return (
    <View style={styles.container}>
       <TouchableOpacity
        onPress={playSound}
        style={[styles.button, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>Music On</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={soundOff}
        style={[styles.button, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>Music off</Text>
      </TouchableOpacity>
    </View>
  );
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
