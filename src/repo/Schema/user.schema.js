import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    userId:{
        type: String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum:["Guest","Moderator","Admin"],
        default:"Guest"
    }
})

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10)
    }
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAuthToken = async function(){
    return jwt.sign({id:this._id, userId: this.userId },"foxinthebox",{expiresIn:'1hr'});
}

userSchema.methods.verifyAuthToken = async function(token){
    try {
        return await jwt.verify(token,"foxinthebox")
        
    } catch (error) {
        console.log(error)
        return null
    }
}

const User = mongoose.model('User', userSchema)

export default User