// authService.js
import { projectAuth, googleAuthProvider, projectFirestore } from '../../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Register a new user
export const registerUser = async ({ email, password, name }) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(projectAuth, email, password);
        // await updateProfile(projectAuth.currentUser, { name });

        const { user } = userCredential;

        // Create user document in Firestore with default roles and permissions
        await setDoc(doc(projectFirestore, 'HikUsers', user.uid), {
            Id: user.uid,
            Email: user.email,
            Name: name,
            PhotoURL: user.photoURL,
            Role: 'admin', // Default role
            Permissions: ['canRead', 'canDoTest', 'canViewSummary']
        });

        const userDocRef = doc(projectFirestore, 'HikUsers', user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (!userDoc.exists()) {
            throw new Error("User is not existed");
        }

        return setCurrentUser(userDoc);
    } catch (error) {
        throw new Error(error.message);
    }
};

const setCurrentUser = (userDoc) => {
    return {
        id: userDoc.data().Id,
        email: userDoc.data().Email,
        name: userDoc.data().Name,
        photoURL: userDoc.data().PhotoURL,
        role: userDoc.data().Role,
        permissions: userDoc.data().Permissions,
    };
}

// Sign in with email and password
export const loginUser = async ({ email, password }) => {
    try {
        const userCredential = await signInWithEmailAndPassword(projectAuth, email, password);
        const { user } = userCredential;

        // Ensure user document exists in Firestore
        const userDocRef = doc(projectFirestore, 'HikUsers', user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (!userDoc.exists()) {
            throw new Error("User is not existed");
        }

        return setCurrentUser(userDoc);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Sign in with Google
export const signInWithGoogle = async () => {
    try {
        const userCredential = await projectAuth.signInWithPopup(googleAuthProvider);
        const { user } = userCredential;

        // Ensure user document exists in Firestore
        const userDocRef = doc(projectFirestore, 'HikUsers', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            throw new Error("User is not existed");
        }

        return setCurrentUser(userDoc);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Sign out user
export const logoutUser = async () => {
    try {
        await signOut(projectAuth);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Check authentication state
export const checkAuthState = async () => {
    return new Promise((resolve) => {
        onAuthStateChanged(projectAuth, async (user) => {
            if (user) {
                // resolve(user);
                const userDocRef = doc(projectFirestore, 'HikUsers', user.uid);
                const userDoc = await getDoc(userDocRef);
                
                if (!userDoc.exists()) {
                    throw new Error("User is not existed");
                }
        
                resolve(setCurrentUser(userDoc));
            } else {
                resolve(null);
            }
        });
    });
};
