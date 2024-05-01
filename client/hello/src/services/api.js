import axios from "axios";

const BASE_URL = "http://localhost:8000/"
const axiosInstance = axios.create({baseURL: BASE_URL});

export const getTodos = async () =>{
    return (await axiosInstance.get("/")).data
}
export const uploadFile = async (file) => {
    // Create a FormData object
    const formData = new FormData()
    formData.append('file', file);

    // Send a POST request with the form data
    const response = await axiosInstance.post('/uploadFile', formData, {
        // Set the 'Content-Type' header to 'multipart/form-data'
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    // Return the response data
    return response.data;
};
export const uploadFiles = async (files) => {
    // Create a FormData object
    const formData = new FormData();

    // Append each file in the files array to the FormData object
    files.forEach((file) => {
        formData.append('files', file);  // Append each file using the key 'files'
    });

    // Send a POST request with the form data
    const response = await axiosInstance.post('/uploadFiles', formData, {
        // Set the 'Content-Type' header to 'multipart/form-data'
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    // Return the response data
    return response.data;
};

