import { useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { projectStorage } from '../firebase/config';

const useFirebaseStorage = () => {
    const [progress, setProgress] = useState(0);
    const [fileUrl, setFileUrl] = useState(null);
    const [error, setError] = useState(null);

    const uploadFile = async (file, folderName) => {
        if (!file) {
            setError('No file selected');
            return;
        }

        // Get the current date and time
        const currentDateTime = new Date().toISOString().replace(/[:.]/g, '-');
        // Create a new filename with date and time appended
        const newFileName = `${file.name}-${currentDateTime}`;
        
        const storageReference = ref(projectStorage, `${folderName}/${newFileName}`);
        const uploadTask = uploadBytesResumable(storageReference, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                snapshot => {
                    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(percent);
                },
                err => {
                    setError(err.message);
                    reject(err.message);
                },
                async () => {
                    try {
                        const url = await getDownloadURL(uploadTask.snapshot.ref);
                        setFileUrl(url);
                        resolve(url);
                    } catch (err) {
                        setError(err.message);
                        reject(err.message);
                    }
                }
            );
        });
    };

    return { progress, fileUrl, error, uploadFile };
};

export default useFirebaseStorage;
