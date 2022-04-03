// necessary imports
import React, { Component } from 'react';
import { auth, database } from '../../firebase';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { getUserInfo, getUnlockedBuildingData } from '../../services/getDataFromFirebase';

// fetching images in a proper way
import Images from '../../assets/index';

// 3rd part timeline component page
import Timeline from 'react-native-timeline-flatlist';
import { DrawerActions } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/core'

var user = null;
var hotspots = [];

export default class PathwayDetailsOneScreen extends Component {
    constructor() {
        super();

        this.onEventPress = this.onEventPress.bind(this);
        this.renderSelected = this.renderSelected.bind(this);
        this.renderDetail = this.renderDetail.bind(this);

        this.hotspots = [
            { "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra luctus sapien at pharetra.", "icon": <Image style={{ width: 20, height: 20 }} source={Images.timeline.icons.archery} />, "imageUrl": "erie", "lineColor": "#009688", "time": "#1", "title": "Erie Hall" },
            { "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra luctus sapien at pharetra.", "icon": <Image style={{ width: 20, height: 20 }} source={Images.timeline.icons.archery} />, "imageUrl": "lambton", "lineColor": "#009688", "time": "#2", "title": "Lambton Tower" },
            { "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra luctus sapien at pharetra.", "icon": <Image style={{ width: 20, height: 20 }} source={Images.timeline.icons.archery} />, "imageUrl": "essex", "lineColor": "#009688", "time": "#3", "title": "Essex Hall" },
        ]

        this.state = { selected: null, hotspots: this.hotspots, unlocked_buildings: [], isTimeSaved: false };
    }

    onEventPress(data) {
        this.setState({ selected: data })
    }

    // to be replaced later with AR trigger, adding dummy function for reference
    renderSelected() {
        // console.log("rowData from renderSelected : ", this.state)
        // if (this.state.selected && this.state.unlocked_buildings.indexOf(this.state.selected.imageUrl) == -1) {
        //     return <Text style={{ marginTop: 10 }}>{this.state.selected.title} is Locked</Text>
        // }
        // return <Text style={{ marginTop: 10 }}>Selected hotspot: {this.state.selected.title} at {this.state.selected.time}</Text>
    }

    // function to save the current time and store it in firebase
    getCurrentTime() {
        // if already time saved in firebase, don't save
        console.log("is time saved??", this.state.isTimeSaved)

        if (!this.state.isTimeSaved) {
            const currentTime = Date.now()
            console.log("Pathway1 start time is ", currentTime)

            user = auth.currentUser;
            //console.log("user is", user)
            const reference = database.ref();
            if (user) {
                reference.child("users").child(user.uid).child("pathway1timer").get().then((snapshot) => {
                    if (snapshot.exists()) {
                        // update the pathway1 timer
                        console.log("total time taken for pathway 1", snapshot.val().totaltime)
                        reference.child("users").child(user.uid).child("pathway1timer").update({
                            pathwaystart: currentTime
                        })
                        this.setState({ isTimeSaved: true })
                    }

                })
            }
        }
    }

    renderDetail(rowData, sectionID, rowID) {
        let title = <Text style={[styles.title]}>{rowData.title}</Text>
        var desc = null
        if (rowData.description && rowData.imageUrl)
            desc = (
                <View style={styles.descriptionContainer}>
                    {
                        this.state.unlocked_buildings.indexOf(rowData.imageUrl) > -1 ?
                            <TouchableOpacity
                                onPress={() => {
                                    // store the pathway 1 start time in firebase to later calculate the difference
                                    this.getCurrentTime();
                                    this.props.navigation.navigate('ViroReactTest', { datafromPathway: rowData })
                                }}>

                                {/* disabled={this.state.unlocked_buildings.indexOf(rowData.imageUrl) > -1 ? false : true} */}
                                <Image source={Images.timeline.buildings[rowData.imageUrl]} style={styles.image} />
                            </TouchableOpacity>
                            :

                            <Image source={Images.timeline.buildings[rowData.imageUrl]} style={[styles.image, { opacity: 0.3 }]} />
                    }

                    <Text style={[styles.textDescription]}>{rowData.description}</Text>
                </View >
            )

        return (
            <View style={{ flex: 1 }}>
                {title}
                {desc}
            </View>
        )
    }

    // commented it out as component refresh bug isn't fixed yet, using hardcoded values for now
    componentDidMount() {
        //this.getData("pathway-1");
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            user = getUserInfo();
            if (user) {
                getUnlockedBuildingData(user).then((snapshot) => {
                    // console.log("snapshot : ", snapshot)
                    this.setState({ unlocked_buildings: snapshot.val().unlocked_buildings })
                    console.log("this.state :", this.state.unlocked_buildings)
                })
            }
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }


    getData(pathway) {
        const reference = database.ref();

        var dbPathwayRef = reference.child("pathways").child(pathway);
        dbPathwayRef.on("value", function (snapshot) {
            hotspots = []
            snapshot.forEach((childSnapshot) => {
                childSnapshot.forEach((childSnap) => {

                    hotspots.push({
                        title: childSnap.val().title,
                        description: childSnap.val().description,
                        time: childSnap.val().time,
                        icon: <Image style={{ width: 20, height: 20 }} source={Images.timeline.icons[childSnap.val().icon]} />,
                        lineColor: childSnap.val().lineColor,
                        source: childSnap.val().source,
                        imageUrl: childSnap.val().imageUrl

                    });

                });
            });

        });

        this.setState({ hotspots: hotspots });
    }

    render() {
        const { hotspots } = this.state;
        console.log("render : ", this.state.unlocked_buildings)
        return (
            <View style={styles.container}>
                <Timeline
                    style={styles.list}
                    data={hotspots}
                    circleSize={20}
                    circleColor='rgba(0,0,0,0)'
                    lineColor='rgb(45,156,219)'
                    timeContainerStyle={{ minWidth: 52, marginTop: 0 }}
                    timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: '#fff', padding: 5, borderRadius: 30 }}
                    descriptionStyle={{ color: '#d2d2d2' }}
                    options={{ style: { paddingTop: 5 } }}
                    innerCircle={'icon'}
                    onEventPress={this.onEventPress}
                    renderDetail={this.renderDetail}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 80,
        backgroundColor: '#fff'
    },
    list: {
        flex: 1,
        marginTop: '10%',
    },
    title: {
        marginTop: -12,
        fontSize: 16,
        fontWeight: 'bold'
    },
    descriptionContainer: {
        flexDirection: 'row',
        paddingRight: 50,
        marginBottom: 15,
        marginTop: 5
    },
    image: {
        marginTop: 20,
        width: 50,
        height: 50,
        borderRadius: 25
    },
    textDescription: {
        marginTop: 15,
        marginLeft: 10,
        color: '#000'
    }
});