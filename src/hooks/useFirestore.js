import { collection, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { projectFirestore } from "../firebase/config"; // Adjust the import according to your Firebase configuration file

export const useFirestore = (collectionName) => {
  // Add a document
  const addDocument = async (docData) => {
    try {
      const CreatedAt = serverTimestamp();
      const addedDocument = await addDoc(collection(projectFirestore, collectionName), { ...docData, CreatedAt });
      return { success: true, document: addedDocument };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Delete a document
  const deleteDocument = async (id) => {
    try {
      await deleteDoc(doc(projectFirestore, collectionName, id));
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Could not delete' };
    }
  };

  // Update a document
  const updateDocument = async (id, updates) => {
    try {
      const updatedDocument = await updateDoc(doc(projectFirestore, collectionName, id), updates);
      return { success: true, document: updatedDocument };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return { addDocument, deleteDocument, updateDocument };
};

