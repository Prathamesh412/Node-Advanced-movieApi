import redis from "../config/redis.js";
import { logMsg } from "./logProducer.js";

export const getDataFromRedis = async(key)=>{
    const testData = await redis.get(key);

    return JSON.parse(testData)
}

export const setDataToRedis = async(key,data, cacheDuration)=>{
    await redis.setex(key, cacheDuration, JSON.stringify(data))
    return
}

export const invalidateKey = async(key, logId) =>{
    logMsg(logId, 'invalidating redis key', {})
    await redis.del(key);
}