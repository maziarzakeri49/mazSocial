import mongoose from "mongoose";

let initialized = false;

export const connect = async ()=>{
    mongoose.setI('strictQuery' , true)
    if(initialized){
        console.log('Already connected to MongoDB');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL , {
            dbName:'maz-social-app',
            useNewUrlParser:true ,
            useUnifiedTopology:true

        });
        console.log('connected to db')
        initialized=true
        
    } catch (error) {
        console.log('Error connecting to MongoDB' , error)
        
    }
};