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
