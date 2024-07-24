import mongoose from "mongoose";
const Schema = mongoose.Schema;
const bookuserSchema = new mongoose.Schema({
    title:{
        type: String,
        required:[true,"Please Provide Your Name!"],
        minLength:[3,"Name must contain at least 3 Characters!"],
        maxLength:[30, "Name cannot exceed 30 Characters!"],
        },
    author:{
        type: String,
        required:[true,"Please Provide author Name!"],
        minLength:[3,"Author Name must contain at least 3 Characters!"],
        maxLength:[30, "Author Name cannot exceed 30 Characters!"],
        },
    Coverpage:{
        type: Schema.Types.ObjectId,
        required:[true,"Please Provide Coverpage Id!"],
        ref:"fileuploads"
        },
    year:{
        type: Number,
        required:[true,"Please Provide year!"],
        },

    createdAt: {
        type: Date,
        default: Date.now,
        },
})
 const booksUserModel= mongoose.model("booksUser", bookuserSchema);     
 export default  booksUserModel;