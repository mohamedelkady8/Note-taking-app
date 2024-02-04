const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters long"],
        trim: true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
        trim: true
    }
}, { timestamps: true }); 

const User = mongoose.model("User", userSchema);
module.exports = User;