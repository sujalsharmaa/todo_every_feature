import mongoose from "mongoose";


export async function connectToMongoDB(url){
    try {
        return mongoose.connect(url).then(() => { console.log("mongodb connected") })
    } catch (error) {
        console.log(error)
    }
}