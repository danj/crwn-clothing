import {useState} from "react";
import {
    getOrCreateUserDocumentFromAuth,
    signInUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import('./sign-in-form.styles.scss');

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            console.log("all fields required");
            return
        }

        try {
            await signInUserWithEmailAndPassword(email, password);
        }
        catch (error) {
           console.log('Error with sign in', error.message);
        }
    }

    const logGoogleUser = async () => {
        try {
            await signInWithGooglePopup();
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="sign-in-container">
            <h2>I already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" required name="email" type="email" onChange={handleChange} value={email}/>
                <FormInput label="Password" required name="password" type="password" onChange={handleChange} value={password}/>
                <span className="buttons">
                    <Button type="submit">SIGN IN</Button>
                    <Button type="button" buttonType='google' onClick={logGoogleUser}>SIGN IN WITH GOOGLE</Button>
                </span>
            </form>
        </div>
    )
}

export default SignInForm;
