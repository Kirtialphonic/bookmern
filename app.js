import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import fileRouter from "./routes/fileRoute.js";
import booksRoute from "./routes/BooksRoute.js"
import cookieParser from "cookie-parser";

const app = express();
dotenv.config({path:"./config/config.env"})

// cookieparser used for getting token and authorization
app.use(cookieParser());

// express json converts string into json
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/file", fileRouter);
app.use("/api/v1/books", booksRoute);

dbConnection();
// Always use error middleware at last
app.use(errorMiddleware)

export default app; 