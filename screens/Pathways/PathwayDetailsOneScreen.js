// necessary imports
import React, { Component } from 'react';
import { auth, database } from '../../firebase';
import {
    StyleSheet, Text, View, Image, TouchableOpacity,
    Alert, Modal, Pressable
} from 'react-native';
import {
    getUserInfo, getUnlockedBuildingData, buyHintsforHotspots,
    getAllHints, getUsersHints, checkScores
} from '../../services/getDataFromFirebase';

// fetching images in a proper way
import Images from '../../assets/index';

// 3rd part timeline component page
import Timeline from 'react-native-timeline-flatlist';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { Value } from 'react-native-reanimated';

var user = null;
var hotspots = [];

export default class PathwayDetailsOneScreen extends Component {
    constructor() {
        super();

        this.onEventPress = this.onEventPress.bind(this);
        this.renderSelected = this.renderSelected.bind(this);
        this.renderDetail = this.renderDetail.bind(this);

        this.hotspots = [
            { "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra luctus sapien at pharetra.", "icon": <Image style={{ width: 20, height: 20 }} source={Images.timeline.icons.archery} />, "imageUrl": "erie", "lineColor": "#009688", "time": "#1", "title": "Erie Hall", "hotspot": "Hotspot 1" },
            { "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra luctus sapien at pharetra.", "icon": <Image style={{ width: 20, height: 20 }} source={Images.timeline.icons.archery} />, "imageUrl": "lambton", "lineColor": "#009688", "time": "#2", "title": "Lambton Tower", "hotspot": "Hotspot 2" },
            { "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra luctus sapien at pharetra.", "icon": <Image style={{ width: 20, height: 20 }} source={Images.timeline.icons.archery} />, "imageUrl": "essex", "lineColor": "#009688", "time": "#3", "title": "Essex Hall", "hotspot": "Hotspot 3" },
        ]

        this.state = {
            selected: null, hotspots: this.hotspots, current_building: '',
            unlocked_buildings: [], isVisible: false, hint1: '', hint2: '', hint3: ''
        };
    }

    displayModal(show) {
        this.setState({ isVisible: show })
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

    renderDetail(rowData, sectionID, rowID) {
        let title = <Text style={[styles.title]}>{rowData.hotspot}</Text>
        var desc = null
        if (rowData.description && rowData.imageUrl)
            desc = (
                <View style={styles.descriptionContainer}>
                    {
                        (this.state.current_building == rowData.imageUrl || this.state.unlocked_buildings.indexOf(rowData.imageUrl) > -1) ?
                            <TouchableOpacity
                                onPress={() => {
                                    this.state.current_building == rowData.imageUrl ?
                                        this.props.navigation.navigate('ViroReactTest', { datafromPathway: rowData }) :
                                        this.displayAlert()
                                }}>

                                <Image source={Images.timeline.buildings[rowData.imageUrl]} style={styles.image} />
                            </TouchableOpacity>
                            :
                            <Image source={Images.timeline.buildings[rowData.imageUrl]} style={[styles.image, { opacity: 0.1 }]} />
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

    displayAlert() {
        Alert.alert(
            "Hotspot completed",
            "You have already completed this hotspot",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }
    // commented it out as component refresh bug isn't fixed yet, using hardcoded values for now
    componentDidMount() {
        //this.getData("pathway-1");
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            user = getUserInfo();
            if (user) {
                getUnlockedBuildingData(user).then((snapshot) => {
                    console.log("snapshot : ", snapshot)
                    if (snapshot.val().unlocked_buildings) {
                        this.setState({ current_building: Images.indexs[snapshot.val().unlocked_buildings.length] })
                        this.setState({ unlocked_buildings: snapshot.val().unlocked_buildings })
                    }
                    else {
                        this.setState({ current_building: Images.indexs[0] })
                        this.setState({ unlocked_buildings: [] })
                    }
                    // this.setState({ unlocked_buildings: snapshot.val().unlocked_buildings })
                    console.log("this.state :", this.state.current_building, this.state.unlocked_buildings)
                })
            }
            console.log("refreshed -----")
            this.checkHints();
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

    displayHints() {
        // console.log("hints")
    }

    refreshModal() {
        this.displayModal(false);
        this.displayModal(true);
    }

    buyHint(index, hintPoints) {
        if (this.state.current_building == 'erie'
            && this.state.unlocked_buildings.indexOf('erie') == -1) {

            checkScores().then(score => {
                let user_score = parseInt(JSON.stringify(score))
                if (user_score >= hintPoints) {
                    buyHintsforHotspots(index, "erie-hints", (user_score - hintPoints)).then((snapshot) => {
                        this.checkHints();
                        this.refreshModal();
                    })
                }
                else {
                    Alert.alert(
                        "Insufficient points",
                        "You don't have enough points to buy hint",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                }
            })
        }
        else if (this.state.current_building == 'lambton'
            && this.state.unlocked_buildings.indexOf('lambton') == -1) {
            checkScores().then(score => {
                let user_score = parseInt(JSON.stringify(score))
                if (user_score >= hintPoints) {
                    buyHintsforHotspots(index, "lambton-hints", (user_score - hintPoints)).then((snapshot) => {
                        this.checkHints();
                        this.refreshModal();
                    })
                }
                else {
                    Alert.alert(
                        "Insufficient points",
                        "You don't have enough points to buy hint",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                }
            })
        }
        else if (this.state.current_building == 'essex'
            && this.state.unlocked_buildings.indexOf('essex') == -1) {
            checkScores().then(score => {
                let user_score = parseInt(JSON.stringify(score))
                if (user_score >= hintPoints) {
                    buyHintsforHotspots(index, "essex-hints", (user_score - hintPoints)).then((snapshot) => {
                        this.checkHints();
                        this.refreshModal();
                    })
                }
                else {
                    Alert.alert(
                        "Insufficient points",
                        "You don't have enough points to buy hint",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                }
            })
        }
        else {
            Alert.alert(
                "Hotspot completed",
                "You can not buy hints for completed hotspots",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
    }

    checkHints() {
        console.log("current building : ", this.state.current_building)
        if (this.state.current_building == 'erie') {
            getAllHints("erie-hints").then((snapshot) => {
                if (snapshot) {
                    console.log("snapshot : ", snapshot)
                    getUsersHints("erie-hints").then((hint) => {
                        // console.log("user hint : ", hint.val())
                        if (hint.val()) {
                            if (hint.val()[0] != null) {
                                console.log((JSON.stringify(snapshot.val()[0])).replace(/["]+/g, ''))
                                this.setState({ hint1: (JSON.stringify(snapshot.val()[0])).replace(/["]+/g, '') })
                            }
                            if (hint.val()[1] != null) {
                                this.setState({ hint2: (JSON.stringify(snapshot.val()[1])).replace(/["]+/g, '') })
                            }
                            if (hint.val()[2] != null) {
                                this.setState({ hint3: (JSON.stringify(snapshot.val()[2])).replace(/["]+/g, '') })
                            }
                        }
                        else {
                            this.setState({ hint1: '' })
                            this.setState({ hint2: '' })
                            this.setState({ hint3: '' })
                        }
                    })
                }
            })
        }

        else if (this.state.current_building == 'lambton') {
            getAllHints("lambton-hints").then((snapshot) => {
                if (snapshot) {
                    console.log("snapshot : ", snapshot)
                    getUsersHints("lambton-hints").then((hint) => {
                        // console.log("user hint : ", hint.val())
                        if (hint.val()) {
                            if (hint.val()[0] != null) {

                                this.setState({ hint1: (JSON.stringify(snapshot.val()[0])).replace(/["]+/g, '') })
                            }
                            if (hint.val()[1] != null) {
                                this.setState({ hint2: (JSON.stringify(snapshot.val()[1])).replace(/["]+/g, '') })
                            }
                            if (hint.val()[2] != null) {
                                this.setState({ hint3: (JSON.stringify(snapshot.val()[2])).replace(/["]+/g, '') })
                            }
                        }
                        else {
                            this.setState({ hint1: '' })
                            this.setState({ hint2: '' })
                            this.setState({ hint3: '' })
                        }
                    })
                }
            })
        }

        else if (this.state.current_building == 'essex') {
            getAllHints("essex-hints").then((snapshot) => {
                if (snapshot) {
                    console.log("snapshot : ", snapshot)
                    getUsersHints("essex-hints").then((hint) => {
                        // console.log("user hint : ", hint.val())
                        if (hint.val()) {
                            if (hint.val()[0] != null) {
                                this.setState({ hint1: (JSON.stringify(snapshot.val()[0])).replace(/["]+/g, '') })
                            }
                            if (hint.val()[1] != null) {
                                this.setState({ hint2: (JSON.stringify(snapshot.val()[1])).replace(/["]+/g, '') })
                            }
                            if (hint.val()[2] != null) {
                                this.setState({ hint3: (JSON.stringify(snapshot.val()[2])).replace(/["]+/g, '') })
                            }
                        }
                        else {
                            this.setState({ hint1: '' })
                            this.setState({ hint2: '' })
                            this.setState({ hint3: '' })
                        }
                    })
                }
            })
        }
    }


    render() {
        const { hotspots } = this.state;
        // console.log("render : ", this.state.current_building)
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'right' }}>
                    <Button type='clear'
                        icon={
                            <Icon
                                name="info-circle"
                                size={30}
                                color="#941b0c"
                            />
                        }
                        onPress={() => {
                            this.displayModal(true);
                            this.checkHints();
                        }}
                    />
                </Text>
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

                <Modal
                    animationType={"none"}
                    transparent={true}
                    visible={this.state.isVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has now been closed.');
                    }}>
                    {this.state.isVisible &&
                        <View style={styles.containertwo}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                <Text style={styles.text}>Hint 1</Text>
                                {/* <Text>{this.state.hint1}</Text> */}
                                {

                                    (this.state.hint1 == '' || this.state.hint1 == null) ?

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Button buttonStyle={styles.iconButton}
                                                type='clear'
                                                icon={
                                                    <Icon
                                                        name="shopping-cart"
                                                        size={30}
                                                        color="#ee9b00"
                                                    />
                                                }
                                                onPress={() => {
                                                    this.buyHint(0, 50)
                                                }}
                                            />
                                            <Text style={[styles.hintPoints, { marginLeft: 10 }]}>(50 points)</Text>
                                        </View>

                                        :
                                        <Text style={styles.hintText}> {this.state.hint1} </Text>
                                }
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                <Text style={styles.text}>Hint 2</Text>
                                {
                                    (this.state.hint2 == '' || this.state.hint2 == null) ?
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Button buttonStyle={styles.iconButton}
                                                type='clear'
                                                icon={
                                                    <Icon
                                                        name="shopping-cart"
                                                        size={30}
                                                        color="#ee9b00"
                                                    />
                                                }
                                                onPress={() => {
                                                    this.buyHint(1, 100)
                                                }}
                                            />
                                            <Text style={styles.hintPoints}>(100 points)</Text>
                                        </View>
                                        :
                                        <Text style={styles.hintText}> {this.state.hint2} </Text>
                                }
                            </View>

                            <View style={{
                                flexDirection: 'row', justifyContent: 'space-between',
                                marginBottom: 20
                            }}>

                                <Text style={styles.text}>Hint 3</Text>
                                {
                                    (this.state.hint3 == '' || this.state.hint3 == null) ?
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Button buttonStyle={styles.iconButton}
                                                type='clear'
                                                icon={
                                                    <Icon
                                                        name="shopping-cart"
                                                        size={30}
                                                        color="#ee9b00"
                                                    />
                                                }
                                                onPress={() => {
                                                    this.buyHint(2, 150)
                                                }}
                                            />
                                            <Text style={styles.hintPoints}>(150 points)</Text>
                                        </View>
                                        :
                                        <Text style={styles.hintText}> {this.state.hint3} </Text>
                                }
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    this.displayModal(!this.state.isVisible);
                                }}
                                style={[styles.button, styles.buttonOutline]}
                            >
                                <Text style={styles.buttonOutlineText}>Close</Text>
                            </TouchableOpacity>

                        </View>
                    }
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contentWrap: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignItems: 'stretch',
        // justifyContent: 'flex-start',
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 80,
        backgroundColor: '#fff'
    },
    containertwo: {
        marginTop: 200,
        backgroundColor: '#363636',
        marginRight: 15,
        marginLeft: 15,
        paddingTop: 20
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
    },
    closeButton: {
        display: 'flex',
        height: 60,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#941b0c',
        shadowColor: '#941b0c',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowRadius: 25,
    },
    text: {
        fontSize: 22,
        marginRight: 30,
        padding: 20,
        // textAlign: 'left',
        color: '#e9d8a6'
    },
    closeText: {
        fontSize: 24,
        color: '#941b0c',
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',
    },
    hintText: {
        fontSize: 18,
        // marginRight: 30,
        paddingTop: 25,
        // textAlign: 'left',
        color: '#0a9396',
        flex: 1,
        flexWrap: 'wrap',

    },
    button: {
        backgroundColor: '#941b0c',
        width: '30%',
        marginHorizontal: 130,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        padding: 10,
        borderRadius: 10,
        marginBottom: 20
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
    iconButton: {
        padding: 20
    },
    hintPoints: {
        color: "#ee9b00",
        fontSize: 16,
        marginTop: 25,
        marginRight: 20
    }
});