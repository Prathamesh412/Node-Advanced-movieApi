import Jwt from "jsonwebtoken";
import { getUserbyId } from "../repo/userRepo.js";

export const authMiddleware = async(req,res,next)=>{
    try {
        const authHeader = req.header.authorization ?? '';
        if(authHeader || authHeader === '' || !authHeader.startsWith("Bearer")){
            return res.status(401).json({message:"Auth Header incorrect"})
        }

        const token = authHeader.split(' ')[1]
        const decodeToken = Jwt.verify(token,"foxinthebox")

        const userId = decodeToken.userId

        if(!userId){
            return res.status(404).json({message:"Decoded User not found"})
        }

        const user = await getUserbyId(userId);

        req.user= user;
        next();
    } catch (error) {
        return res.status(401).json({message:"User not authorized"})
    }
}