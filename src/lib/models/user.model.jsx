import mongoose from "mongoose";


const userSchema=mongoose.Schema(
    {
        clerkID:{
            type:String,
            required:true ,
            unique:true
        },
        email:{
            type:String,
        },
        firstName:{
            type:String,
            required:true ,
        },
        lastName:{
            type:String,
            required:true ,

        },
        username:{
            type:String,
            required:true ,

        },
        avetar:{
            type:String,
            required:true ,

        },
        followers:{
            type:[{type:mongoose.Schema.Types.ObjectId , ref:'User'}],
            default:[],
        },
        following:{
            type:[{type:mongoose.Schema.Types.ObjectId , ref:'User'}],
            default:[],

        }

        
    },{timestamps:true}
);
const User=mongoose.model.User || mongoose.model('User',userSchema)
export default User ;