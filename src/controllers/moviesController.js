import express from "express";

import { getMovies, getSingleMovie, createMovie, UpdateMovie,deleteMovie } from "../services/moviesServices.js";

import { authMiddleware } from "../middlewares/authorization.middleware.js";

import { body } from "express-validator";
import { handleValidationErrors } from "../middlewares/validationError.middleware.js";
import { limiter } from "../middlewares/rateLimiter.middleware.js";


const validateMovieData = [
    body('movieRating').isFloat({min:0.0,max:10.0}).withMessage('rating must be between 0 and 10'),
    body('movieDuration').isInt({min:0}).withMessage('Duration min must be 0')
]

const router = express.Router();

router.get("/", limiter, getMovies)
router.get("/:id", getSingleMovie)

router.post("/", validateMovieData ,handleValidationErrors, authMiddleware, createMovie)

router.put("/:id",authMiddleware, UpdateMovie)
router.delete("/:id",authMiddleware, deleteMovie)

export default router