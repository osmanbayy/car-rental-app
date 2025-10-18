import express from "express";
import { authUser } from "../middleware/authMiddleware.js";
import { agencyRegister } from "../controllers/agencyController.js";

const agencyRouter = express.Router();

agencyRouter.post("/", authUser, agencyRegister);

export default agencyRouter;