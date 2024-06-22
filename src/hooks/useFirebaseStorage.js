import { useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { projectStorage } from '../firebase/config';

const useFirebaseStorage = () => {
    const [progress, setProgress] = useState(0);
    const [fileUrl, setFileUrl] = useState(null);
    const [error, setError] = useState(null);

    const uploadFile = (file, folderName) => {
        if (!file) {
            setError('No file selected');
            return;
        }

        const storageReference = ref(projectStorage, `${folderName}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageReference, file);

        uploadTask.on(
            'state_changed',
            snapshot => {
                const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(percent);
            },
            err => {
                setError(err.message);
            },
            async () => {
                try {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    setFileUrl(url);
                } catch (err) {
                    setError(err.message);
                }
            }
        );
    };

    return { progress, fileUrl, error, uploadFile };
};

export default useFirebaseStorage;
