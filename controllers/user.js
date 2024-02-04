const sendResponse = require('../helpers/sendRespose');
const User = require('../models/user');
const Note = require('../models/note');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const key = process.env.TOKEN_SECRET || "secret";

// signup
exports.signup = async (req, res) => {
    try{
        const {name, email, password, cpassword} = req.body;
        // check if user exists
        const emailExists = await User.findOne({email: email});
        if(emailExists){
            return sendResponse(res, 400, "User already exists");
        }
        if(password !== cpassword){
            return sendResponse(res, 400, "Passwords do not match");
        }

        // hash password
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        // create user
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword
        });
        const savedUser = await user.save();
        return sendResponse(res, 200, savedUser);
    }
    catch(err){
        return sendResponse(res, 500, err.message);
    }
}

// login
exports.login = async (req, res) => {
    console.log(req.body);
    try{
        const {email, password} = req.body;
        // check if user exists
        const user = await User.findOne({email: email});
        if(!user){
            return sendResponse(res, 400, "User does not exist");
        }
        // check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return sendResponse(res, 400, "Invalid password");
        }
        // create token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        return sendResponse(res, 200, token);
    }
    catch(err){
        return sendResponse(res, 500, err.message);
    }
}

// get user
exports.getUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return sendResponse(res, 400, "User does not exist");
        }
        return sendResponse(res, 200, user);
    }
    catch(err){
        return sendResponse(res, 500, err.message);
    }
}

// update user
exports.updateUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return sendResponse(res, 400, "User does not exist");
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return sendResponse(res, 200, updatedUser);
    }
    catch(err){
        return sendResponse(res, 500, err.message);
    }
}

// delete user and notes
exports.deleteUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return sendResponse(res, 400, "User does not exist");
        }
        // delete notes
        await Note.deleteMany({user: req.params.id});
        // delete user
        await User.findByIdAndDelete(req.params.id);
        return sendResponse(res, 200, "User deleted successfully");
    }
    catch(err){
        return sendResponse(res, 500, err.message);
    }
}