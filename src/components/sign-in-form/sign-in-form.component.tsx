import {ChangeEvent, FormEvent, useState} from "react";
import {
    signInUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {SignInContainer} from "./sign-in-form.styles";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!email || !password) {
            console.log("all fields required");
            return
        }

        try {
            await signInUserWithEmailAndPassword(email, password);
        }
        catch (error: any) {
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
        <SignInContainer>
            <h2>I already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" required name="email" type="email" onChange={handleChange} value={email}/>
                <FormInput label="Password" required name="password" type="password" onChange={handleChange} value={password}/>
                <span className="buttons">
                    <Button type="submit">SIGN IN</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={logGoogleUser}>SIGN IN WITH GOOGLE</Button>
                </span>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;
