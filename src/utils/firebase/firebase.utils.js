import { initializeApp } from 'firebase/app';
import { getAuth,
    signInWithRedirect, signOut,
    signInWithPopup, GoogleAuthProvider,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, writeBatch, getDocs, query } from 'firebase/firestore'

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
    const { displayName, email } = userAuth;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
        const data = {
            displayName,
            email,
            createdAt: new Date(),
            ...additionalInformation,
        }
        console.log(`Setting user doc with ${JSON.stringify(data)}`);
        try {
            await setDoc(userDocRef, data);
        }
        catch (error) {
            console.log('error creating user', error.message);
        }
    } else {
        //check if any keys need updating
        const fieldsToCheck = {
            email,
            ...additionalInformation
        };
        const fieldsToUpdate = {}
        const userData = userDoc.data();
        Object.keys(fieldsToCheck).forEach((key) => {
           if (fieldsToCheck[key] !== userData[key]) {
               fieldsToUpdate[key] = fieldsToCheck[key];
           }
        });

        if (displayName && displayName !== userData.displayName) {
            fieldsToUpdate.displayName = fieldsToUpdate;
        }
        if (fieldsToUpdate) {
            console.log(`Updating user ${userData.email} with ${JSON.stringify(fieldsToUpdate)}`);
            try {
                await updateDoc(userDocRef, fieldsToUpdate, { merge: true });
            }
            catch (error) {
                console.log('error updating user', error.message);
            }
        }
    }

    const updatedDoc = await getDoc(userDocRef);
    return updatedDoc;
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
       const docRef = doc(collectionRef, object.title.toLowerCase());
       batch.set(docRef, object)
    });

    await batch.commit();
    console.log('Done');
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const snapshot = await getDocs(q);
    const categories = snapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
    return categories;
}
