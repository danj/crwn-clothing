import { initializeApp } from 'firebase/app';
import { getAuth,
    signInWithRedirect, signOut,
    signInWithPopup, GoogleAuthProvider,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'
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
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);


// Firestore
export const db = getFirestore();

export const getOrCreateUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        }
        catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        return;
    }

    const response = await createUserWithEmailAndPassword(auth, email, password);
    return response.user;
}

export const signInUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        return;
    }

    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user;
}

export const signOutUser = async () => {
    const res = await signOut(auth);
    return res;
}

export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback);
