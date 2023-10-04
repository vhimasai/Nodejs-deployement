import express from "express";
import usersServices from "../services/users.services.js";
import validateUser from "../middlewares/validators/users.validator.js";
import authMiddleware from "../middlewares/auth/authMiddleware.js";
const usersRouter = express.Router();

usersRouter.post("/", validateUser.createUser, usersServices._createUser);
usersRouter.post("/login", usersServices._loginUser);
usersRouter.get("/", authMiddleware, usersServices._getAllUsers);
usersRouter.get("/:id", authMiddleware, usersServices._getUserById);
usersRouter.get("/email/:email", authMiddleware, usersServices._getUserByEmail);
usersRouter.put("/:id", authMiddleware, usersServices._updateUser);
usersRouter.delete("/:id", authMiddleware, usersServices._deleteUser);

export default usersRouter