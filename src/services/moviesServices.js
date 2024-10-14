import { getMovieById, getAllMovies,UpdateMovieById,deleteMovieById,createMovieById } from "../repo/moviesRepo.js";

import {getDataFromRedis,setDataToRedis,invalidateKey} from "../lib/redisHelper.js"

const Redis_Key = 'movie';
const Redis_Cache = 3600;


export const getMovies = async(req,res)=>{
    const getResultRedis = await getDataFromRedis(Redis_Key)

    if(getResultRedis){
        console.log("Found data from Redis", Redis_Key)
        res.status(200).json(getResultRedis)
        return
    }

    const result = await getAllMovies();
    console.log("Getting Data from database")
    await setDataToRedis(Redis_Key,result, Redis_Cache)
    res.status(200).json(result)
}

export const getSingleMovie = async(req,res)=>{

    const resultFromRedis = await getDataFromRedis(Redis_Key)

    const id = req.params.id ?? ''


    if(resultFromRedis){
        console.log("Found data from Redis", Redis_Key)
        //res.status(200).json(resultFromRedis)
        const movie = resultFromRedis?.find(result => result?._id === id)
       // console.log(movie)
        res.status(200).json(movie)
        return
    }

    const result = await getMovieById(id) 

    if(!result){
        res.status(404).json({message: 'Movie not found'})
        return null
    }

    res.status(200).json(result)

    
}

export const createMovie = async(req,res) =>{


    const {movieName,
        movieDescription,
        movieDuration,
        movieRating,
        genre,
        producer,
        director,
        actors} = req.body ?? {}
    const result = await createMovieById(movieName,
        movieDescription,
        movieDuration,
        movieRating,
        genre,
        producer,
        director,
        actors);
    await invalidateKey(Redis_Key)

    res.status(200).json(result)
}

export const UpdateMovie = async(req,res) =>{

    const id = req.params.id ?? '';
    const {movieName,
        movieDescription,
        movieDuration,
        movieRating,
        genre,
        producer,
        director,
        actors} = req.body ?? {}

    const result = await UpdateMovieById(id,movieName,
        movieDescription,
        movieDuration,
        movieRating,
        genre,
        producer,
        director,
        actors);
    await invalidateKey(Redis_Key)

    if(!result){
        res.status(404).json({message: 'Movie not found'})
        return
    }

    res.status(200).json(result)
}


export const deleteMovie = async(req,res)=>{

    const id = req.params.id ?? "";

    const result = await deleteMovieById(id)
    await invalidateKey(Redis_Key)

    if(!result){
        res.status(404).json({message: 'Movie not found'})
        return
    }

    res.status(204).json({message:"Movie deleted"})
}
