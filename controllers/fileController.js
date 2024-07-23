import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import Fileupload from "../models/fileupload.js";
import Upload from "../middlewares/upload.js";

export const uploadFile = catchAsyncErrors(async (req, res, next) => {
  try {
    if (!req.file || !req.file.path) {
      console.error("No file uploaded or file path is missing");
      return next(new ErrorHandler("No file uploaded", 400));
    }

    console.log("File path received:", req.file.path);

    const upload = await Upload.uploadFile(req.file.path);
    console.log("Cloudinary upload result:", upload);

    if (!upload || !upload.secure_url) {
      return next(new ErrorHandler("File upload failed", 500));
    }

    let fileSchema = new Fileupload({
      file_url: upload.secure_url,
    });

    let record = await fileSchema.save();
    res.send({ success: true, msg: 'File Uploaded Successfully!', data: record });
  } catch (error) {
    console.error("Error in file upload process:", error);
    return next(new ErrorHandler(error.message, 500));
  }
});

