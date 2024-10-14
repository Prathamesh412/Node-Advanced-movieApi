import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        required: true
    },
    role:{
        type:String,
        required: true,
        enum: ["Actor", "Director", "Producer", "Musician", "Writer"]
    },
})

const Participant = mongoose.model("Participants", participantSchema )

export default Participant;