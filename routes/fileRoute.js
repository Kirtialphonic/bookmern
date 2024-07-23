// routes/fileRoute.js
import express from "express";
import { uploadFile } from "../controllers/fileController.js";
import multer from "multer";

var uploader = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 5000000 } // 5MB limit
});

const router = express.Router();

router.post('/upload-file', uploader.single('file'), uploadFile );

export default router;
