const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title:{
        type: String,
        required: [true, "Title is required"]
    },
    description:{
        type: String,
        required: false
    },
    color:{
        type: String,
        required: false
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
