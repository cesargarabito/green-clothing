import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, 
   signInWithPopup, GoogleAuthProvider, 
  createUserWithEmailAndPassword, signOut,
onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCnEEZWFrG5TmbWr__tndWMXpTNAxbZdAU",
    authDomain: "green-clothing-cg.firebaseapp.com",
    projectId: "green-clothing-cg",
    storageBucket: "green-clothing-cg.appspot.com",
    messagingSenderId: "603661715324",
    appId: "1:603661715324:web:c95436b060ce01307846f9",
    measurementId: "G-CXS4G1RGXN"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  
  export const db = getFirestore();

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });
    await batch.commit();
    console.log('done');
  }; 

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
     return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
    
    
  }

  export const createUserDocumentFromAuth = async(userAuth, additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    

    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userSnapshot;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => 
onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth, 
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};