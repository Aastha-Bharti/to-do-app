import mongoose from "mongoose";
import { array } from "zod";


// mongodb+srv://asbharti27:KvH2444zFG7M161E@aasthascluster02.pjukx.mongodb.net/
mongoose.connect("mongodb+srv://asbharti27:KvH2444zFG7M161E@aasthascluster02.pjukx.mongodb.net/ToDo")

const mySchema = new mongoose.Schema({
    title: String,
    description: String,
    markAsDone: {
        type: Boolean,
        default: false,
    }
});

const userSchema = new mongoose.Schema({
    name : String,
    email: String,
    password : String,
    todo : {
        type : [mySchema],
        required : false
    }
});


export const ToDoModel = new mongoose.model("ToDoModel", mySchema);
export const userModel = new mongoose.model("userModel", userSchema);

// module.exports = ToDoModel;