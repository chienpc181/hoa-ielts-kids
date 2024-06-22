import { useReducer, useEffect, useState } from "react";
import { collection, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { projectFirestore } from "../firebase/config"; // Adjust the import according to your Firebase configuration file

// const projectFirestore = getFirestore(firebaseApp);

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null };
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null };
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null };
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload };
    case "UPDATED_DOCUMENT":
      return { isPending: false, document: action.payload, success: true, error: null };
    default:
      return state;
  }
};

export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async (docData) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const CreatedAt = serverTimestamp();
      const addedDocument = await addDoc(collection(projectFirestore, collectionName), { ...docData, CreatedAt });
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
    }
  };

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      await deleteDoc(doc(projectFirestore, collectionName, id));
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' });
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' });
    }
  };

  // update a document
  const updateDocument = async (id, updates) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const updatedDocument = await updateDoc(doc(projectFirestore, collectionName, id), updates);
      dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: updatedDocument });
      return updatedDocument;
    }
    catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
      return null;
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, response };
};
