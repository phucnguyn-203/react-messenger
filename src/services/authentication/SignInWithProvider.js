import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";

import { authentication } from "../../config/firebase.config";
import updateDocument from '../firestore/updateDocument'
import setDocument from "../firestore/setDocument";

//handle logic log in with Google
const SignInWithProvider = async (provider) => {
    // Create an instance of the Google provider object:
    const response = await signInWithPopup(authentication, provider);
    const addtionalUserInfo = getAdditionalUserInfo(response);

    const { user } = response;
    // if user is first time login => store user data to cloud firestore
    if (addtionalUserInfo.isNewUser) {
        const data = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            providerId: addtionalUserInfo.providerId,
            isOnline: true,
        }
        // store user data to firestore database
        setDocument('users', user.uid, data);
    } else {
        // if user is not first time login => update online status
        updateDocument('users', user.uid, {
            isOnline: true
        })
    }
}

export default SignInWithProvider;