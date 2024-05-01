import { model } from "../model/model.js";
import { upload } from "../middleware/multer.middleware.js";

export const getTodo = async (req,res)=>{
    try {
        const todos = await model.find({});
        res.status(200).json(todos);
    } catch (error) {
        console.error("Error retrieving todo items:", error);
        res.status(500).send("Internal Server Error");
    }
}

export const createTodo = async (req, res) => {
    try {
        // Get the new todo data from the request body
        const newTodoData = req.body;

        // Create a new todo document using the Todo model
        const newTodo = new model(newTodoData);

        // Save the new todo to the database
        const savedTodo = await newTodo.save();

        // Send the saved todo as a JSON response
        res.status(201).json(savedTodo);
    } catch (error) {
        // If an error occurs, log it and send a 500 status code
        console.error("Error creating todo item:", error);
        res.status(500).send("Internal Server Error");
    }
};


export const updateTodo = async (req, res) => {
    try {
        // Get the ID from the URL parameter
        const { id } = req.params;

        // Get the update data from the request body
        const updateData = req.body;

        // Find the todo item by ID and update it
        const updatedTodo = await model.findByIdAndUpdate(id, updateData, { new: true });

        // If the todo item is not found, send a 404 response
        if (!updatedTodo) {
            return res.status(404).send("Todo item not found");
        }

        // Send the updated todo item as a JSON response
        res.status(200).json(updatedTodo);
    } catch (error) {
        // If an error occurs, log it and send a 500 status code
        console.error("Error updating todo item:", error);
        res.status(500).send("Internal Server Error");
    }
};


export const deleteTodo = async (req, res) => {
    try {
        // Get the ID from the URL parameter
        const { id } = req.params;

        // Find the todo item by ID and delete it
        const deletedTodo = await model.findByIdAndDelete(id);

        // If the todo item is not found, send a 404 response
        if (!deletedTodo) {
            return res.status(404).send("Todo item not found");
        }

        // Send a success message as a response
        res.status(200).send("Todo item deleted successfully");
    } catch (error) {
        // If an error occurs, log it and send a 500 status code
        console.error("Error deleting todo item:", error);
        res.status(500).send("Internal Server Error");
    }
};


export const getTodobyId = async (req, res) => {
    try {
        // Get the ID from the URL parameter
        const { id } = req.params;

        // Find the todo item by ID
        const todo = await model.findById(id);

        // If the todo item is not found, send a 404 response
        if (!todo) {
            return res.status(404).send("Todo item not found");
        }

        // Send the todo item as a JSON response
        res.status(200).json(todo);
    } catch (error) {
        // If an error occurs, log it and send a 500 status code
        console.error("Error retrieving todo item by ID:", error);
        res.status(500).send("Internal Server Error");
    }
};


// Controller function to handle file upload
export const handleFileUpload = (req, res) => {
    // Multer will call this function with `req.file` containing the uploaded file information

    if (req.file) {
        // Process the file (e.g., save the file, perform any necessary operations)
        console.log("File uploaded:", req.file);

        // Send a success response as JSON
        res.json({ msg: 'File uploaded successfully!' });
    } else {
        // If no file is uploaded, send an error response as JSON
        res.status(400).json({ error: 'No file uploaded' });
    }
};

// Controller function to handle multiple file uploads
export const handleFileUploads = (req, res) => {
    // Multer will call this function with `req.files` containing an array of uploaded files

    if (req.files && req.files.length > 0) {
        // Process the files (e.g., save the files, perform any necessary operations)
        console.log("Files uploaded:", req.files);

        // Send a success response as JSON
        res.json({ msg: 'Files uploaded successfully!' });
    } else {
        // If no files are uploaded, send an error response as JSON
        res.status(400).json({ error: 'No files uploaded' });
    }
};

