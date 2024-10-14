import mongoose from "mongoose";
import Participant from "./Schema/participants.schema.js";

export const getAllParticipant = async () => {
  const results = await Participant.find();

  if (!results) {
    return [];
  }

  return results;
};

export const getParticipantById = async (id) => {
  const result = await Participant.findById(id);

  if (!result) {
    return null;
  }

  return result;
};

export const createParticipantsByName = async (name, age, role) => {
  const newParticipant = new Participant({ name, age, role });

  const result = await newParticipant.save();

  return result;
};

export const updateParticipantsbyId = async (id, name, age, role) => {
  const result = await Participant.findByIdAndUpdate(id, { name, age, role }, {new: true});

  if (!result) {
    return null;
  }

  return result;
};

export const deleteParticipant = async (id) => {
  const result = await Participant.findByIdAndDelete(id);

  if (!result) {
    return false;
  }

  return true;
};
