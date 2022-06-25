import {signInWithGooglePopup, getOrCreateUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
    const logGoogleUser = async () => {
        try {
            const response = await signInWithGooglePopup();
            console.log(response);

            const userAuth = response.user;
            getOrCreateUserDocumentFromAuth(userAuth);
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        </div>
    );
}

export default SignIn;
