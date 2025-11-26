import mongoose from "mongoose";

const projectShema = new mongoose.Schema({
    title:{type:String,required:true},
    description:String,
    repoUrl: { type: String },
    language: { type: String, default: "Unknown", index: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    members:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    createdAt:{type:Date,default:Date.now},
})

export default mongoose.model('Project',projectShema);