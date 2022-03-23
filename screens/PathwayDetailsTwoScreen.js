// necessary imports
import React, { Component } from 'react';
import { auth, database } from '../firebase';
import { StyleSheet, Text, View, Image } from 'react-native';

// fetching images in a proper way
import Images from '../assets/index';

// 3rd part timeline component page
import Timeline from 'react-native-timeline-flatlist';
 
var user = null;
var hotspots = [];

export default class PathwayDetailsTwoScreen extends Component {
    constructor(){
        super();

        this.onEventPress = this.onEventPress.bind(this);
        this.renderSelected = this.renderSelected.bind(this);
        this.renderDetail = this.renderDetail.bind(this);

        this.hotspots = [
            { "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra luctus sapien at pharetra.", "icon": <Image style={{width: 20, height: 20}} source={Images.timeline.icons.archery} />, "imageUrl": "welcome", "lineColor": "#009688", "time": "#1", "title": "Welcome Centre" },
            { "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra luctus sapien at pharetra.", "icon": <Image style={{width: 20, height: 20}} source={Images.timeline.icons.archery} />, "imageUrl": "caw", "lineColor": "#009688", "time": "#2", "title": "CAW Centre" },
            { "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra luctus sapien at pharetra.", "icon": <Image style={{width: 20, height: 20}} source={Images.timeline.icons.archery} />, "imageUrl": "cycle", "lineColor": "#009688", "time": "#3", "title": "Cycle Junction" },
        ]

        this.state = {selected: null, hotspots: this.hotspots};
    } 

    onEventPress(data){
        this.setState({selected: data})
    }
 
    // to be replaced later with AR trigger, adding dummy function for reference
    renderSelected(){
        if(this.state.selected)
            return <Text style={{marginTop:10}}>Selected hotspot: {this.state.selected.title} at {this.state.selected.time}</Text>
    }

    renderDetail(rowData, sectionID, rowID) {
        let title = <Text style={[styles.title]}>{rowData.title}</Text>
        var desc = null
        if(rowData.description && rowData.imageUrl)
            desc = (
                <View style={styles.descriptionContainer}>   
                    <Image source={Images.timeline.buildings[rowData.imageUrl]} style={styles.image}/>
                    <Text style={[styles.textDescription]}>{rowData.description}</Text>
                </View>
            )

        return (
            <View style={{flex:1}}>
                {title}
                {desc}
            </View>
        )
    }

    // commented it out as component refresh bug isn't fixed yet, using hardcoded values for now
    componentDidMount() {
        //this.getData("pathway-2");  
    }


    getData(pathway) {
        const reference = database.ref();

        var dbPathwayRef = reference.child("pathways").child(pathway);
        dbPathwayRef.on("value", function(snapshot) {
            hotspots = []
            snapshot.forEach((childSnapshot) => {
                childSnapshot.forEach((childSnap) =>{

                    hotspots.push({
                    title: childSnap.val().title,
                    description: childSnap.val().description,
                    time: childSnap.val().time,
                    icon: <Image style={{width: 20, height: 20}} source={Images.timeline.icons[childSnap.val().icon]} />,
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

        return (
                <View style={styles.container}>
                { this.renderSelected() }
                <Timeline 
                style={ styles.list }
                data={ hotspots }
                circleSize={ 20 }
                circleColor='rgba(0,0,0,0)'
                lineColor='rgb(45,156,219)'
                timeContainerStyle={ { minWidth: 52, marginTop: 0 } }
                timeStyle={ { textAlign: 'center', backgroundColor:'#ff9797', color:'#fff', padding: 5, borderRadius: 30 } }
                descriptionStyle={ { color:'#d2d2d2' } }
                options={ { style:{ paddingTop: 5 } } }
                innerCircle={ 'icon' }
                onEventPress={ this.onEventPress }
                renderDetail={ this.renderDetail }
                />
                </View>
            );
        }
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop:80,
        backgroundColor:'#fff'
    },
    list: {
        flex: 1,
        marginTop:'10%',
    },
    title:{
        marginTop: -12,
        fontSize:16,
        fontWeight: 'bold'
    },
    descriptionContainer:{
        flexDirection: 'row',
        paddingRight: 50,
        marginBottom: 15,
        marginTop: 5
    },
    image:{
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