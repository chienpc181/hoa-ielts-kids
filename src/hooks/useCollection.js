import { useEffect, useState, useRef } from "react";
import { collection, query as firestoreQuery, where, orderBy, onSnapshot } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collectionName, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // _query is an array and is "different" on every function call
  const query = useRef(_query).current;
  const order = useRef(_orderBy).current;

  useEffect(() => {
    let ref = collection(projectFirestore, collectionName);

    let q;
    if (query && order) {
      q = firestoreQuery(ref, where(...query), orderBy(...order));
    } else if (query) {
      q = firestoreQuery(ref, where(...query));
    } else if (order) {
      q = firestoreQuery(ref, orderBy(...order));
    } else {
      q = ref;
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("could not fetch the data");
      }
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [collectionName, query, order]);

  return { documents, error };
};
