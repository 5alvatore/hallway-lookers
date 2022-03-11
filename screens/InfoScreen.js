import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';

function InfoScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
        <Text>Info Screen</Text>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default InfoScreen;