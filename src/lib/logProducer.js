import { channel } from "../config/rabbitmq.js";
import { LOG_QUEUE } from "../constants.js";


const publishLog = (logId, logMessage, logObject, type) => {
    const log = { logId, logMessage, logObject, type, createdAt: new Date()}; // type is log or error
    channel.sendToQueue(LOG_QUEUE, Buffer.from(JSON.stringify(log)));
};


export const logMsg = (logId, logMessage, logObject) => {
    publishLog(logId, logMessage, logObject, 'log');
};

export const logError = (logId, logMessage, logObject) => {
    publishLog(logId, logMessage, logObject, 'error');
};

