const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    resetToken: String,
    resetTokenExpiration: Date,
    password:{
        type: String,
        required: true,
        unique: true,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    status:{
        type:String,
    },
    posts:[{
        type:Schema.Types.ObjectId,
        ref:'Post'
    }] 
});

module.exports = mongoose.model('User', userSchema);