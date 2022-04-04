const images = {
    timeline: {
        icons: {
            archery: require('./timeline/archery.png'),
        },
        buildings: {
            essex: require('./timeline/buildings/essexhall.jpg'),
            lambton: require('./timeline/buildings/lambtontower.jpg'),
            erie: require('./timeline/buildings/eriehall.jpg'),
            welcome: require('./timeline/buildings/welcomecentre.jpg'),
            caw: require('./timeline/buildings/caw.jpg'),
            cycle: require('./timeline/buildings/cyclestand.jpg')
        },

    },
    image_recognition: {
        essex: require('./Pathway_Images/Essex_Hall_uow.jpeg'),
        lambton: require('./Pathway_Images/Lambton_Tower_uow.jpeg'),
        // lambton: require('./Pathway_Images/skullcandy.jpeg'),
        erie: require('./Pathway_Images/Erie_Hall_uow.jpeg'),
        Lambton_building: require('./Pathway_Images/Lambton_building.jpeg'),
        // Lambton_building: require('./Pathway_Images/room1.jpeg'),
        Essex_Hall_building: require('./Pathway_Images/Essex_Hall_building.jpeg'),
        Erie_Hall_building: require('./Pathway_Images/Erie_Hall_building.jpeg'),
    },
    indexs:{
        0: "erie",
        1: "lambton",
        2: "essex"
    }
};

export default images;