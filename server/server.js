import express from "express";
import { connectToMongoDB } from "./model/connection.js";
import { router } from "./routes/route.js";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 8000;

export const db = connectToMongoDB("mongodb+srv://sujalsharma:i8DhfT3bboHxGFZp@experimentaldb.wfrd7lt.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("db connected successfully");
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
    console.log(`your env name is ${process.env.name}`)
    console.log(`Server is running on port ${PORT}`);
});
