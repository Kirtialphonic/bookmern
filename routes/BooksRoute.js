import express from "express";
import { CreateBook,UpdateBook,GetBook,DeleteBook } from "../controllers/booksController.js";
import isAuthenticated from "../middlewares/auth.js"
 
const router = express.Router();

router.post("/create",isAuthenticated,CreateBook);
router.post("/update/:id",isAuthenticated, UpdateBook)
router.get("/get/:id",isAuthenticated, GetBook)
router.post("/delete/:id",isAuthenticated, DeleteBook)

export default router;