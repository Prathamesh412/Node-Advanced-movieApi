import mongoose from "mongoose";

const moviesSchema = new mongoose.Schema({
    movieName:{
        type: String,
        required: true
    },
    movieDescription:{
        type: String,
        required: true
    },
    movieDuration:{
        type: String,
        required: true,
        min: 1
    },
    movieRating:{
        type: String,
        required: true,
        min: 0.0,
        max: 10.0
    },
    genre:{
        type: String,
        required:true,
        enum: ["Action", "Comedy","Drama", "Fantasy", "Mystery","Romance","Thriller","Suspense"]
    },
    producer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participants"
    },
    director:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participants"
    },
    actors:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participants"
    }]
})

const Movie = mongoose.model("Movie", moviesSchema )

export default Movie;