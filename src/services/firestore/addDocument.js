import { collection, addDoc, Timestamp } from "firebase/firestore";
import { database } from "../../config/firebase.config";

const addDocument = async (...rest) => {
    //using rest operator to get all argument
    const [collections, id, subCollection, data] = rest;

    if (id && subCollection) {
        await addDoc(collection(database, collections, id, subCollection), {
            ...data,
            createdAt: Timestamp.fromDate(new Date())
        })
    } else {
        await addDoc(collection(database, collections), {
            ...data,
            createdAt: Timestamp.fromDate(new Date())
        })
    }

}

export default addDocument;