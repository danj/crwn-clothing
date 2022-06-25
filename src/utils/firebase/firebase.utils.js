import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQAg-zv0qE8ka-n5ctquA6JCNCtRvCyrU",
    authDomain: "crwn-clothing-db-2ca5f.firebaseapp.com",
    projectId: "crwn-clothing-db-2ca5f",
    storageBucket: "crwn-clothing-db-2ca5f.appspot.com",
    messagingSenderId: "459069521091",
    appId: "1:459069521091:web:22920d69f3c5a69e593676"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters(({
    prompt: 'select_account'
}));

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


// Firestore
export const db = getFirestore();

export const getOrCreateUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }
        catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userDocRef;
}
