import User from "../repo/Schema/user.schema.js";
import { getUserbyId, postUser,generateAuthToken,validateUserPassword } from "../repo/userRepo.js";

// Create new user
export const register = async(req,res) =>{
    const {name, userId, password} = req.body

    const UserExists = await getUserbyId(userId)

    if (UserExists){
        res.status(409).json({message:"User already exists"})
        return
    }

    const newUser = await postUser(name,userId,password)

    if(!newUser){
        res.status(500).json({message:"User not created"})
        return
    }

    res.status(401).json(newUser)
}

export const login = async(req,res)=>{
    const {userId,password}= req.body

    const UserExists = await getUserbyId(userId)

    if (!UserExists){
        res.status(404).json({message:"User doesn't exists"})
        return
    }

    const isMatch = await validateUserPassword(userId, password)

    if (!isMatch){
        res.status(404).json({message:"Password doesn't match"})
        return
    }

    const token = await generateAuthToken(userId)

    if (!token){
        res.status(500).json({message:"Token is wrong"})
        return
    }

    res.status(200).json({token})

}