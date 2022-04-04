import { auth, database } from '../firebase';

export const getUserInfo = () => {
    return auth.currentUser;
}

export const getUnlockedBuildingData = (user) => {
    const reference = database.ref();
    return reference.child("users").child(user.uid).get().then((snapshot) => snapshot)
}

export const addUnlockedBuilding = (index, building) => {
    const reference = database.ref();

    return reference.child("users").child(auth.currentUser.uid)
        .child("unlocked_buildings").child(index).set(building).then(result => result)

}

export const getAllHints = (building) => {
    const reference = database.ref();
    return reference.child("hints").child(building).get().then((snapshot) => snapshot)
}

export const getUsersHints = (building) => {
    const reference = database.ref();
    return reference.child("users").child(auth.currentUser.uid)
    .child("hints_bought").child(building).get().then((snapshot) => snapshot)
}

export const buyHintsforHotspots = (index, building,updated_score) => {
    const reference = database.ref();

    reference.child("users").child(auth.currentUser.uid)
    .child("score").set(updated_score).then(result => result)

    return reference.child("users").child(auth.currentUser.uid)
        .child("hints_bought").child(building).child(index).set(index).then(result => result)

}

export const checkScores = () => {
    const reference = database.ref();
    return reference.child("users").child(auth.currentUser.uid)
        .child("score").get().then(result => result)

}