import { useState, useEffect } from 'react';
import { projectFirestore } from "../firebase/config";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";

const useDocument = (col, id) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setError("No document ID provided");
            return;
        }

        const docRef = doc(projectFirestore, col, id);

        const unsubscribe = onSnapshot(docRef, snapshot => {
            if (snapshot.exists) {
                setDocument({ id: snapshot.id, ...snapshot.data() });
                setError(null);
            } else {
                setError("Document does not exist");
            }
        }, err => {
            setError(err.message);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [col, id]);

    return { document, error };
};

// const getDocument = async (col, id) => {
//     const docRef = doc(projectFirestore, col, id);
//     const docSnap = await getDoc(docRef);
  
//     return { id: docSnap.id, ...docSnap.data() }
//   }

export default useDocument;
