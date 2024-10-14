import User from "./Schema/user.schema.js";


export const getUserbyId = async(userId)=>{
    const user = await User.findOne({userId})

    if(!user){
        return null
    }

    return user;
}

export const postUser = async(name, userId, password)=>{
    const user = new User({name, userId, password})
    await user.save()
    return user
}

export const validateUserPassword = async(userId, password) =>{
    const user = await User.findOne({userId})
    return user.comparePassword(password)
}

export const generateAuthToken = async(userId) =>{
    const user = await getUserbyId(userId);

    return user.generateAuthToken()
}