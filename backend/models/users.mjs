import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
});
const dishSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    }
});
const reserveSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    date:{
        type:Date,
        required:true,
    },
    number:{
        type:Number,
        required:true
    },
    table:{
        type:Number,
        required:true
    },
    commentary:{
        type:String
    }
});
export const User = mongoose.model('User',userSchema);
export const Dish = mongoose.model('Dish', dishSchema);
export const Reserve = mongoose.model('Reserve', reserveSchema)
