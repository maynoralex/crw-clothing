import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYghkOrfoVaMsHKplg7F1530LuYzC6mqk",
    authDomain: "crwn-cloth-db-edcc3.firebaseapp.com",
    projectId: "crwn-cloth-db-edcc3",
    storageBucket: "crwn-cloth-db-edcc3.firebasestorage.app",
    messagingSenderId: "140019054886",
    appId: "1:140019054886:web:0c13497f87c3ecf54c29e7"
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
const provider = new GoogleAuthProvider();

export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docref = doc(collectionRef,object.title.toLowerCase());
        batch.set(docref, object);
    });

    await batch.commit();
    console.log('done.');
}

export const getCollectionAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((docSnapShot) => docSnapShot.data());

}

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)


export const createUserDocFromAuth = async(userAuth, additionalInformation = {}) => {
    const userDocRef = doc(db, "users", userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error creating user on db', error.message);
        }
    }

    return userSnapshot;
}

export const createAuthUserWithEmailPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback) => 
    onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
    return new Promise((resolve, reject) =>{
        const unsubscribe = onAuthStateChanged(auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        )
    });
}