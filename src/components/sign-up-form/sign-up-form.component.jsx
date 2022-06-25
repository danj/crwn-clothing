import {useState} from "react";
import {createAuthUserWithEmailAndPassword, getOrCreateUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import('./sign-up-form.styles.scss');

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!displayName || !email || !password) {
            console.log("all fields required");
            return
        }

        if (confirmPassword != password) {
            console.log("passwords don't match");
            return
        }

        try {
            const userAuth = await createAuthUserWithEmailAndPassword(email, password);
            const userDoc = await getOrCreateUserDocumentFromAuth(userAuth, { displayName });
            console.log(userDoc);
        }
        catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Email already in use!');
            }

            console.log('Error with sign up', error.message);
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" required name="displayName" type="text" onChange={handleChange} value={displayName}/>
                <FormInput label="Email" required name="email" type="email" onChange={handleChange} value={email}/>
                <FormInput label="Password" required name="password" type="password" onChange={handleChange} value={password}/>
                <FormInput label="Confirm Password" required name="confirmPassword" type="password" onChange={handleChange} value={confirmPassword}/>
                <Button type="submit">SIGN UP</Button>
            </form>
        </div>
    )
}

export default SignUpForm;
