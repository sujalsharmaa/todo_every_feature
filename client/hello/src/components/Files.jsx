import React, { useState } from 'react';
import { useUploadFiles } from '../services/queries';


function FileUploads() {
    // State to hold the selected files
    const [files, setFiles] = useState([]);

    // Hook to handle file uploads
    const { mutate: uploadFilesMutation, isLoading, isError, data } = useUploadFiles();

    // Handle file input change
    const handleFileChange = (event) => {
        setFiles(event.target.files);
    };

    // Handle file upload
    // Handle file upload
    const handleFileUpload = async () => {
        if (files.length > 0) {
            // Create a new FormData object and append files to it

            const formData = new FormData();
            Array.from(files).forEach(file => {
                formData.append('files', file);
            });

            try {
                console.log(formData);
                // Use the uploadFilesMutation function to upload the files
                await uploadFilesMutation(formData, {
                    onSuccess: () => {
                        console.log('Files uploaded successfully');
                    },
                    onError: (error) => {
                        console.error('Error uploading files:', error);
                    }
                });
            } catch (error) {
                // Handle any errors that may occur during the upload process
                console.error('Error occurred during file upload:', error);
            }
        }
    };
    
    return (
        <div>
            <input type="file" multiple onChange={handleFileChange} />
            <button onClick={handleFileUpload} disabled={isLoading}>
                {isLoading ? 'Uploading...' : 'Upload Files'}
            </button>
            
            {isError && <div>Error uploading files. Please try again. {isError}</div>}
            {data && <div>Files uploaded successfully! {data}</div>}
        </div>
    );
}

export default FileUploads;

