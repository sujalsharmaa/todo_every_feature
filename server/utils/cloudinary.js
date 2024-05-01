import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv"
dotenv.config()
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME ,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null;
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        console.log("file is uploaded on cloudinary",
        response.url
        );
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the file from the server
        return null;
    }
}

export {uploadOnCloudinary}