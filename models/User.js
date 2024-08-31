import mongoose from "mongoose"

const schema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resume:{
        type:Buffer
    }
})

const User=mongoose.model('User',schema)
export default User