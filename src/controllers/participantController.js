import express from "express";

import { getParticipants, CreateParticipants, getParticipant, UpdateParticipant,deleteParticipantById } from "../services/participantServices.js";

import { authMiddleware } from "../middlewares/authorization.middleware.js";
import { checkPermission } from "../middlewares/role.middleware.js";


const router = express.Router();

router.get("/", getParticipants)
router.get("/:id", getParticipant)

router.post("/",authMiddleware, checkPermission('create'),CreateParticipants)

router.put("/:id",authMiddleware,checkPermission('update'), UpdateParticipant)

router.delete("/:id",authMiddleware,checkPermission('delete'), deleteParticipantById)

export default router