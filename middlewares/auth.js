import { catchAsyncErrors } from "./catchAsyncError.js"
import ErrorHandler from "./error.js";
import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { access_token } = req.cookies;
    if (!access_token) {
      return next(new ErrorHandler("User Not Authorized", 401));
    }
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET_KEY);
  
    req.user = await User.findById(decoded.id);
  
    next();
  });