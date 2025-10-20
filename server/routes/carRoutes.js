import express from "express";
import { upload } from "../middleware/multer.js";
import { authUser } from "../middleware/authMiddleware.js";
import { addNewCar, getAgencyCars, getAllAvailableCars, toggleCarAvailability } from "../controllers/carController.js";

const carRouter = express.Router();

carRouter.post("/", upload.array("images", 4), authUser, addNewCar);
carRouter.get("/", getAllAvailableCars);
carRouter.get("/owner", getAgencyCars);
carRouter.post("/toggle-availability", authUser, toggleCarAvailability);

export default carRouter;