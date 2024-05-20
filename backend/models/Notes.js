const mongoose = require("mongoose");
const {Schema} = mongoose;
const notesSchema = new Schema({
    user:{ // it is a actt like a foreign key to link with user
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    },
});

module.exports = mongoose.model("notes" , notesSchema)
