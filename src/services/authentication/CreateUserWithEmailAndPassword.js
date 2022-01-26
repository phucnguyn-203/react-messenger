import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authentication } from "../../config/firebase.config";
import setDocument from "../firestore/setDocument";


const CreateUserWithEmailAndPassword = async (name, email, password) => {
    // create account default without displayName field
    const response = await createUserWithEmailAndPassword(authentication, email, password);
    // update displayName field
    await updateProfile(authentication.currentUser, { displayName: name });

    const { user } = response;
    const data = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: user.providerId,
        isOnline: true
    }

    setDocument('users', user.uid, data);
}

export default CreateUserWithEmailAndPassword;