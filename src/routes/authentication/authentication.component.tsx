import { getRedirectResult } from 'firebase/auth';
import {useEffect} from "react";
import {auth} from '../../utils/firebase/firebase.utils';
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import {AuthenticationContainer} from "./authentication.styles";

const SignIn = () => {
    useEffect( () => {
        async function tryLogin() {
            const response = await getRedirectResult(auth);
            if (response) {
                console.log(`Logged in as ${response.user.displayName}`);
            } else {
                console.log('Not logged in');
            }
        }
        tryLogin();
    }, []);

    return (
        <AuthenticationContainer>
            {
                //<button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
            }
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    );
}

export default SignIn;
