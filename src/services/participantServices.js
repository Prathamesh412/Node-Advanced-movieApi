import { getAllParticipant, createParticipantsByName, getParticipantById, updateParticipantsbyId, deleteParticipant } from "../repo/participantsRepo.js";

import {getDataFromRedis,setDataToRedis,invalidateKey} from "../lib/redisHelper.js"
import { logMsg } from "../lib/logProducer.js";

const Redis_Key = 'participant';
const Redis_Cache = 3600;

export const getParticipants = async(req,res) =>{

    const resultFromRedis = await getDataFromRedis(Redis_Key)

    if(resultFromRedis){
        console.log("Found data from Redis", Redis_Key)
        res.status(200).json(resultFromRedis)
        return
    }

    const result = await getAllParticipant();
    console.log("Getting Data from database")
    await setDataToRedis(Redis_Key,result, Redis_Cache)
    res.status(200).json(result)
}

export const getParticipant = async(req,res)=>{

    const resultFromRedis = await getDataFromRedis(Redis_Key)

    const id = req.params.id ?? ''

    if(resultFromRedis){
        console.log("Found data from Redis", Redis_Key)
       // res.status(200).json(resultFromRedis)
        const participant = resultFromRedis?.find(result => result?._id === id)
        //console.log(participant)
        res.status(200).json(participant)
        return
    }

    const result = await getParticipantById(id)

    if(!result){
        res.status(404).json({mesage: 'Participant not found'})
        return
    }

    console.log("Getting single result from database")
    res.status(200).json(result)
}

export const CreateParticipants = async(req,res) =>{

    const logId = req.logId

    const {age,role,name} = req.body
    logMsg(logId,'creating Participants',{age,role,name});
    const result = await createParticipantsByName(name,age,role, logId);
    await invalidateKey(Redis_Key, logId)

    res.status(200).json(result, logId)
}

export const UpdateParticipant = async(req,res) =>{

    const id = req.params.id ?? '';
    const {age,role,name} = req.body
    const result = await updateParticipantsbyId(id,name,age,role);
    await invalidateKey(Redis_Key)

    if(!result){
        res.status(404).json({message: 'Participant not found'})
        return
    }

    res.status(200).json(result)
}


export const deleteParticipantById = async(req,res)=>{

    const id = req.params.id ?? "";
    const user = req.user ?? "";

    const result = await deleteParticipant(id)
    await invalidateKey(Redis_Key)

    if(!result){
        res.status(404).json({message: 'Participant not found'})
        return
    }

    res.status(204).json({message:"Particiapnt deleted"})
}
