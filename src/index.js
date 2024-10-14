import express from "express";
import dotenv from "dotenv"
const app = express();
dotenv.config()

import { DB_name } from "./constants.js";
import connect from "./config/db.js";
import participants from "./controllers/participantController.js"
import movie from "./controllers/moviesController.js"
import user from "./controllers/userController.js"

await connect(DB_name);

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))

// Routes
app.use("/participants", participants)
app.use("/movies", movie)
app.use("/user", user)

// app.get("/ping", (req,res)=>{
//     console.log("Inside")
// })

app.listen(8000, ()=>{
    console.log("Server is running on Port 8000")
})