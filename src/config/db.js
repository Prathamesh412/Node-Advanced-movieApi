import mongoose from "mongoose";

const connect = async(dbName) =>{
    try {
        let connectionString = process.env.MONGO_URI || "";

        if (connectionString === ""){
            throw new error("no connection string found")
        }

        connectionString = connectionString.replace(`{1}`, dbName)

        await mongoose.connect(connectionString);
        console.log("DB connection")
    } catch (error) {
        console.log("Could not connect to Mongo" ,error?.message)
        process.exit()
    }
}

export default connect;