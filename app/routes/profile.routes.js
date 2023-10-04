import express from "express";
import profileServices from "../services/profile.services.js";
const profileRouter = express.Router();

profileRouter.post("/", profileServices._createProfile);
profileRouter.get("/", profileServices._getAllProfiles);
profileRouter.get("/:profileId", profileServices._getProfileByPk);
profileRouter.get("/user/:userId", profileServices._getUserProfilesById);

export default profileRouter