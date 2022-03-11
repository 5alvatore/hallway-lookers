import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';

function HelpScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
       
            <Text>How may I help?</Text>
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

export default HelpScreen;