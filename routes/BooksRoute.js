import express from "express";
import { CreateBook,UpdateBook,GetBook,DeleteBook } from "../controllers/booksController.js";
import isAuthenticated from "../middlewares/auth.js"
import checkRole from '../middlewares/checkRole.js';
 
const router = express.Router();
router.post("/create",isAuthenticated,checkRole(['Admin', 'Author']),CreateBook);
router.post("/update/:id",isAuthenticated,checkRole(['Admin', 'Author']), UpdateBook)
router.get("/get/:id",isAuthenticated, GetBook)
router.post("/delete/:id",isAuthenticated, checkRole(['Admin']),DeleteBook)

export default router;