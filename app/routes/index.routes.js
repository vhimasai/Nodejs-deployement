import express from "express";
import usersRouter from "./users.routes.js";
import taskRouter from "./task.routes.js";
import profileRouter from "./profile.routes.js";
import projectRouter from "./project.routes.js";
const routes = express();

routes.use("/users", usersRouter);
routes.use("/task", taskRouter);
routes.use("/profile", profileRouter);
routes.use("/project", projectRouter);

export default routes;