import Redis from "ioredis";

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

redis.on("error",(err)=>{
    console,log("Redis error", err?.message)
})

export default redis