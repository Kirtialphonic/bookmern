import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
import Joi from 'joi';
import booksUserModel from "../models/booksModel.js"

//  Catch Async error middleware for handling async errors 
export const CreateBook = catchAsyncErrors(async (req, res, next) => {
    let reqData = req.body;

       // Check if the user is authenticated and has the role of 'Admin and Author'
   if (req.user.role === "Reader") {
    return next(new ErrorHandler("Access denied. Admins and Authors only.", 403));
  }
  
   // JOi validation
    const validator = Joi.object({
        title: Joi.string().required().messages({
          'any.required': 'title is required'
        }),
        author: Joi.string().required().messages({
          'any.required': 'author is required'
        }),
        Coverpage: Joi.string().required().messages({
          'any.required': 'Coverpage ID is required'
        }),
        year: Joi.number().required().messages({
          'any.required': 'year is required'
        }),
      });
    
      const { error } = validator.validate(req.body);
      if (error) {
        return next(new ErrorHandler(error.details[0].message, 400));
      }

    // check for duplicate entries based on title   
      let con = {
        title: reqData.title,
      };

      let checkName = await booksUserModel.countDocuments(con, {});
      if (checkName > 0) {
        return res.status(400).json({
          message: "Book Already Exists",
        });
      }
      //  Save the data in the Database 
      let newProduct = new booksUserModel(reqData)
      let doc = await newProduct.save();

      return res.status(200).json({
        message: "Book Created Successfully",
        data: doc,
      });
});

export const UpdateBook = catchAsyncErrors(async (req, res, next) => {
    let reqData = req.body;

    // Check if the user is authenticated and has the role of 'Admin and Author'
   if (req.user.role === "Reader") {
    return next(new ErrorHandler("Access denied. Admins and Authors only.", 403));
  }
  
    // JOi validation
     const validator = Joi.object({
         title: Joi.string().required().messages({
           'any.required': 'title is required'
         }),
         author: Joi.string().required().messages({
           'any.required': 'author is required'
         }),
         Coverpage: Joi.string().required().messages({
           'any.required': 'Coverpage ID is required'
         }),
         year: Joi.number().required().messages({
           'any.required': 'year is required'
         }),
       });
     
       const { error } = validator.validate(req.body);
       if (error) {
         return next(new ErrorHandler(error.details[0].message, 400));
       }
        // Check for Book ID in Database and save it in db
        let data = await booksUserModel.updateOne({ _id: req.params.id }, reqData, {
            upsert: true,
        });
    
      return res.status(200).json({
        message: "Book Updated Successfully",
        data: data,
      });
   
});

export const GetBook = catchAsyncErrors(async (req, res, next) => {

    let proData = await booksUserModel.findOne({_id: req.params.id, }) ;
    if (proData) {
      return res.status(200).json({
        message: "Fetched Book Data Successfully",
        data: proData,
      });
    } else {
      return res.status(400).json({
        message: "Book Data not found",
      });
    }
});

export const DeleteBook = catchAsyncErrors(async (req, res, next) => {

   // Check if the user is authenticated and has the role of 'Admin'
   if (req.user.role !== "Admin") {
    return next(new ErrorHandler("Access denied. Admins only.", 403));
  }
  
    let proData = await booksUserModel.deleteOne({_id: req.params.id, }) ;
    if (proData) {
      return res.status(200).json({
        message: "Book Data Deleted Successfully",
        data: proData,
      });
    } else {
      return res.status(400).json({
        message: "Book Data not found",
      });
    }
});
   