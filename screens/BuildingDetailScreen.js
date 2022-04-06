import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Platform, Linking } from 'react-native'

const imagePaths = {
    lambton: require("../assets/timeline/buildings/lambtontower.jpg"),
    essex: require("../assets/timeline/buildings/essexhall.jpg"),
    erie: require("../assets/timeline/buildings/eriehall.jpg"),
    locked_level: require("../assets/locked.png"),
};

var description = {
    lambton: "This is main building of the CS Department in University of Windsor and is currently the tallest building in the university campus.",
    essex: "This is a building in University of Windsor with multiple classrooms. Multiple departments take their classes over here.",
    erie: "This is a building in University of Windsor which is situated right next to the Lambton Tower and CAW Center."
}

var latitude = {
    lambton:  42.3054223,
    essex: 42.305059770649,
    erie: 42.3051877
}

var longitude = {
    lambton: -83.0653745,
    essex: -83.06676376513025,
    erie:  -83.06529876703638,
}

var labels = {
    lambton: "Lambton Tower",
    essex: "Essex Hall",
    erie:  "Erie Hall",
}

const BuildingDetailScreen = ({ route }) => {
    const { imageObj } = route.params;
    const navigation = useNavigation()

    const openGps = () => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${latitude[imageObj.image]},${longitude[imageObj.image]}`;
        const label = labels[imageObj.image];
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });
        Linking.openURL(url);
    }
    //   const handleClose = () => {
    //     navigation.navigate("Home");
    //   }
    return (
        <View>
            <Image
                source={imagePaths[imageObj.image]}
                resizeMode='cover'
                style={{ width: '100%', height: 250, backgroundColor: "white" }}
            ></Image>
            <Text style={styles.titleText}>{imageObj.image}</Text>
            <Text style={styles.text}>{description[imageObj.image]}</Text>
            <TouchableOpacity
                style={[styles.button, styles.buttonOutline]}
                onPress={openGps}
            >
                <Text style={styles.buttonOutlineText}>Directions</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
         style={[styles.button, styles.buttonOutline]}
         onPress={handleClose}
        >
          <Text  style={styles.buttonOutlineText}>Close</Text>
        </TouchableOpacity> */}
        </View>
    )
}

export default BuildingDetailScreen

const styles = StyleSheet.create({
    titleText: {
        color: '#fff',
        fontSize: 20,
        margin: 20,
        textAlign: 'center',
        textTransform: 'capitalize',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline'
    },
    text: {
        color: '#fff',
        fontSize: 20,
        margin: 20,
        textAlign: 'center',
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