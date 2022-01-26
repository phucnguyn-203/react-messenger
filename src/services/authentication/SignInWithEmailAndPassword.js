import { signInWithEmailAndPassword } from "firebase/auth";

import updateDocument from "../firestore/updateDocument";
import { authentication } from "../../config/firebase.config";

const SignInWithEmailAndPassword = async (email, password) => {
    await signInWithEmailAndPassword(authentication, email, password);
    updateDocument('users', authentication.currentUser.uid, {
        isOnline: true
    })
}

export default SignInWithEmailAndPassword;