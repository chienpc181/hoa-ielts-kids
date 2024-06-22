import { getFirestore,serverTimestamp } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAhsTWr9n9SR_iF1z9Bm_yo60C9ApCKuPs",
    authDomain: "hoa-ielts-kids.firebaseapp.com",
    projectId: "hoa-ielts-kids",
    storageBucket: "hoa-ielts-kids.appspot.com",
    messagingSenderId: "107017679024",
    appId: "1:107017679024:web:6ef58ddfb52fd5d86b4b75"
  };

  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const projectFirestore = getFirestore(app);
  const projectAuth = getAuth(app);
  const timestamp = serverTimestamp;
  const projectStorage = getStorage(app);
  const googleAuthProvider = new GoogleAuthProvider();
  
  export {projectFirestore, projectAuth, projectStorage, timestamp, googleAuthProvider}