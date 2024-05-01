import mongoose from "mongoose";

// Define the schema
const todoSchema = new mongoose.Schema({
    id: { type: String, required: true },
    todo: { type: String, required: true },
    isCompleted: { type: Boolean, default: false }
});

// Create the model
// The first argument is the model name, which will be converted to a collection name in the database
// The second argument is the schema you defined
export const model = mongoose.model('Todo', todoSchema);
