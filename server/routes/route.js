import { Router } from "express";
import { getTodo,createTodo,handleFileUpload,updateTodo,deleteTodo,getTodobyId, handleFileUploads } from "../controllers/controllers.js";
import { upload } from "../middleware/multer.middleware.js";

export const router = Router();


router.get("/",getTodo);
router.get("/:id",getTodobyId)
router.post("/",createTodo);
router.put("/:id",updateTodo);
router.delete("/:id",deleteTodo);
router.post("/uploadFile", upload.single('file'),(req,res,next)=>{
    handleFileUpload(req,res,next);
})
router.post("/uploadFiles",upload.array('files',10),(req,res,next)=>{
    handleFileUploads(req,res,next);
})