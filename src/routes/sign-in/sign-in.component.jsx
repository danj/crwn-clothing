import { getRedirectResult } from 'firebase/auth';
import {useEffect} from "react";
import {
    auth,
    signInWithGooglePopup,
    getOrCreateUserDocumentFromAuth,
    signInWithGoogleRedirect
} from '../../utils/firebase/firebase.utils';
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";


const SignIn = () => {
    useEffect( () => {
        async function tryLogin() {
            const response = await getRedirectResult(auth);
            if (response) {
                console.log(`Logged in as ${response.user.displayName}`);
                const userDocRef = await getOrCreateUserDocumentFromAuth(response.user);
            } else {
                console.log('Not logged in');
            }
        }
        tryLogin();
    }, []);

    const logGoogleUser = async () => {
        try {
            const response = await signInWithGooglePopup();
            const userDocRef = getOrCreateUserDocumentFromAuth(response.user);
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
            <SignUpForm />
        </div>
    );
}

export default SignIn;
