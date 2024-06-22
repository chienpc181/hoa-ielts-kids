import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { projectStorage } from "../firebase/config";
import { useSelector } from "react-redux";
import { useState } from "react";

const useStorage = () => {
    // const [filePath, setFilePath] = useState('');
    // const [fileUrl, setFileUrl] = useState('');
    // const [error, setError] = useState('');
    let filePath = '';
    let fileUrl = '';
    let error = '';
    const user = useSelector(state => state.auth.user);

    const uploadFile = async (file, folderName) => {
        filePath = `${folderName}/${user.id}/${file.name}`;
        
        const storageReference = storageRef(projectStorage, filePath);
        try {
            const res = await uploadBytes(storageReference, file);
            fileUrl = await getDownloadURL(storageReference);
            
            // setFileUrl(urlDownload);
            // setFilePath(filePathBuilder);
        }
        catch (err) {
            // setError(err.message);
            error = err.message
        }
    }

    return {fileUrl, filePath, error, uploadFile}
}

export default useStorage