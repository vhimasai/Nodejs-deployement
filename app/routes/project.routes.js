import express from "express";
import projectServices from "../services/project.services.js";
const projectRouter = express.Router();

projectRouter.post("/", projectServices._createProject);
projectRouter.post("/user", projectServices._addProjectToUser);
projectRouter.get("/", projectServices._getAllProjects);
projectRouter.get("/:projectId", projectServices._getProjectByPk);
projectRouter.get("/user/:userId", projectServices._getUserProjectsById);

export default projectRouter