import Redis from "ioredis";

const redis = new Redis({
    host: 'localhost',
    port: 6379
});

redis.on("error",(err)=>{
    console,log("Redis error", err?.message)
})

export default redis