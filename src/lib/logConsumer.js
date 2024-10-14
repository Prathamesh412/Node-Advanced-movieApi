import { channel, connectRabbitMQ } from '../config/rabbitmq.js';
import { LOG_QUEUE, LOG_DB_NAME } from '../constants.js';
import connect from '../config/db.js';
import dotenv from 'dotenv';
import { createLog } from '../repo/logRepo.js';
dotenv.config();

export const startLogConsumer = async () => {
    await connect(LOG_DB_NAME);
    await connectRabbitMQ();
    channel.consume(LOG_QUEUE, async (msg) => {
        if (msg !== null) {
            const logData = JSON.parse(msg.content.toString());
            createLog(logData);
            console.log("logData",logData)
            channel.ack(msg);
        }
    });
};

startLogConsumer().catch(error => console.error(`failed to consume Queue`))