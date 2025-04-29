import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },

    password: String,
    otp: String,

    verified:{
        type: Boolean, 
        default: false
    },

    provider:{
        type:String,
        default: "credentials",
    },
},{ timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
