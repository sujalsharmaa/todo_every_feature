import React from 'react';
import { useUploadFile } from '../services/queries';

function FileUpload() {
    const fileInputRef = React.createRef();

    const { mutate: uploadFileMutation, isLoading, isError, data } = useUploadFile();

    const handleFileUpload = () => {
        const file = fileInputRef.current.files[0];
        if (file) {
            uploadFileMutation(file, {
                onSuccess: () => {
                    // Handle success
                    console.log('File uploaded successfully');
                },
                onError: (error) => {
                    // Handle error
                    console.error('Error uploading file:', error);
                }
            });
        }
    };

    return (
        <div>
            <input type="file" ref={fileInputRef} />
            <button onClick={handleFileUpload} disabled={isLoading}>
                {isLoading ? 'Uploading...' : 'Upload'}
            </button>
            {isError && <div>Error uploading file. Please try again.</div>}
            {data && <div>File uploaded successfully!</div>}
        </div>
    );
}

export default FileUpload;
