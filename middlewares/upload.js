import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({ 
    cloud_name: "dpwbxmago",
    api_key: "685514477173511",
    api_secret: "kHjHoNEfuuBVm4H2FAaqwq-w6fw"
  });
  

  const uploadFile = async (filePath) => {
    try {
      console.log("Uploading file to Cloudinary:", filePath);
      const result = await cloudinary.uploader.upload(filePath);
      console.log("Cloudinary upload result:", result);
      return result;
    } catch (error) {
      throw new Error('File upload failed');
    }
  };
  export default { uploadFile };
