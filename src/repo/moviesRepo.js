import Movie from "./Schema/movies.schema.js";
import mongoose from "mongoose";

export const getAllMovies = async () => {
  const results = await Movie.find()
    .populate("producer", "-id -role")
    .populate("director", "-id -role")
    .populate("actors", "-id -role");

  if (!results) return null;

  return results;
};

export const getMovieById = async (id) => {
  const result = await Movie.findById(id)
    .populate("producer", "-id -role")
    .populate("director", "-id -role")
    .populate("actors", "-id -role");

  if (!result) return null;

  return result;
};

export const createMovieById = async (
  movieName,
  movieDescription,
  movieDuration,
  movieRating,
  genre,
  producer,
  director,
  actors
) => {
  const movie = new Movie({
    movieName,
    movieDescription,
    movieDuration,
    movieRating,
    genre,
    producer,
    director,
    actors,
  });

  await movie.save();

  return movie;
};

export const UpdateMovieById = async (
  id,
  movieName,
  movieDescription,
  movieDuration,
  movieRating,
  genre,
  producer,
  director,
  actors
) => {
  const result = Movie.findByIdAndUpdate(
    id,
    {
      movieName,
      movieDescription,
      movieDuration,
      movieRating,
      genre,
      producer,
      director,
      actors,
    },
    { new: true }
  );

  if (!result) {
    return null;
  }

  return result;
};

export const deleteMovieById = async (id) => {
  const result = await Movie.findByIdAndDelete(id);

  if (!result) {
    return false;
  }

  return true;
};
