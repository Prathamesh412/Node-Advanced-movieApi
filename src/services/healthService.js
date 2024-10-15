import mongoose from 'mongoose';
import {DB_name} from '../constants.js';
import { Redis } from 'ioredis';
import amqp from 'amqplib';
export const checkHealthStatus = async (req, res) => {
    const healthStatus = {
        mongodb: 'UNKNOWN',
        redis: 'UNKNOWN',
        rabbitmq: 'UNKNOWN'
    };
    let overallHealthStatus = 200;

    try {
       await mongoose.connect(process.env.MONGO_URI.replace('{1}', DB_name));
       healthStatus.mongodb = 'OK';
    } catch (error) {
        healthStatus.mongodb = 'DOWN';
        overallHealthStatus = 503;
    }

    try {
        const redisClient = new Redis({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        });
        const pingResult = await redisClient.ping(); 
        
        // Returns PONG if no argument is provided, otherwise return a copy of the argument as a bulk. This command is useful for:
        //Testing whether a connection is still alive.
        //Verifying the server's ability to serve data - an error is returned when this isn't the case (e.g., during load from persistence or accessing a stale replica).
        //Measuring latency.

        if (pingResult === 'PONG') {
            healthStatus.redis = 'OK';
        } else {
            healthStatus.redis = 'DOWN';
        }
    } catch (error) {
        healthStatus.redis = 'DOWN';
        overallHealthStatus = 503;
    }

    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI);
        healthStatus.rabbitmq = 'OK';
        await connection.close();
    } catch (error) {
        healthStatus.rabbitmq = 'DOWN';
        overallHealthStatus = 503;
    }

    res.status(overallHealthStatus).json(healthStatus);
};