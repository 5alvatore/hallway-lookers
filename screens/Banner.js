import { StyleSheet, Text, View } from 'react-native';

const Banner = ({text}) => {
    return (
      <View style={styles.bannerContainer}>
         <Text style={styles.bannerText}>Banner</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    bannerContainer: {
      padding: 10,
      alignItems: 'center',
      backgroundColor: '#9b2',
      margin: 20,
      top :25,
      borderRadius: 15,
      borderBottomEndRadius: 99,
      borderTopLeftRadius: 99
    },
    bannerText:{
      color:'#451',
      fontSize: 25,
      fontWeight: 'bold'
    }
  });
export default Banner