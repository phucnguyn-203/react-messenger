import { sendPasswordResetEmail } from 'firebase/auth';
import { authentication } from '../../config/firebase.config';

const SendPasswordResetEmail = async email => {
    await sendPasswordResetEmail(authentication, email);
}

export default SendPasswordResetEmail;