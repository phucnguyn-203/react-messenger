import {doc, updateDoc} from 'firebase/firestore';

import { database } from '../../config/firebase.config';

const updateDocument = async (collection, id, newData) => {
    await updateDoc(doc(database, collection, id), newData);
}

export default updateDocument;