import React, { useState, useEffect } from 'react';
import { FileUpload } from 'primereact/fileupload';

const FileUploadImage = ({ handleOnSelectFiles }) => {
    const [files, setFiles] = useState([]);

    const onSelect = (e) => {
        const newFiles = e.files;
        setFiles([...files, ...newFiles]);
    };

    const onRemove = (file) => {
        setFiles(files.filter(f => f !== file));
    };

    useEffect(() => {
        handleOnSelectFiles(files);
    }, [files])

    const uploadOptions = { className: 'hidden' }
    const cancelOptions = { className: 'hidden' }

    return (
        <div className="card w-full">
            <FileUpload chooseLabel='Choose images' uploadOptions={uploadOptions} cancelOptions={cancelOptions}
                customUpload multiple accept="image/*" maxFileSize={1000000}
                onSelect={onSelect}
                onRemove={(e) => onRemove(e.file)}
                emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
        </div>
    );
};

export default FileUploadImage;
