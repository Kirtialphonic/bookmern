import mongoose from 'mongoose';

var fileSchema = new mongoose.Schema({  
    file_url:{  
        type:String,
        required:true  
    }
});  
   
const FileUpload = mongoose.model('Fileupload', fileSchema);

export default FileUpload;