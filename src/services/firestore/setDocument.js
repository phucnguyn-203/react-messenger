import { doc, setDoc, Timestamp } from "firebase/firestore";
import { database } from "../../config/firebase.config";


const setDocument = async (collection, id, data) => {
    await setDoc(doc(database, collection, id), {
        ...data,
        createdAt: Timestamp.fromDate(new Date())
    })
}

export default setDocument;