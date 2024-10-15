import express from "express";
import dotenv from "dotenv"
const app = express();
dotenv.config()

import { DB_name } from "./constants.js";
import connect from "./config/db.js";
import participants from "./controllers/participantController.js"
import movie from "./controllers/moviesController.js"
import user from "./controllers/userController.js"
import { connectRabbitMQ } from "./config/rabbitmq.js";
import uid from "tiny-uid";
import { logMsg } from "./lib/logProducer.js";
import { checkHealthStatus } from "./services/healthService.js";

await connect(DB_name);

await connectRabbitMQ()
// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use((req, res, next) => {
    req.logId = uid(7);
    next();
});

// Routes
app.use("/participants", participants)
app.use("/movies", movie)
app.use("/user", user)

app.get("/health", checkHealthStatus)

app.get('/ping', (req, res) => {
    const logId = req?.logId ?? '';
    logMsg(logId, 'inside ping method route handler', { test: 'ping'});
    res.status(200).json({ message: 'pong', logId: req?.logId});
});

app.listen(8000, ()=>{
    console.log("Server is running on Port 8000")
})