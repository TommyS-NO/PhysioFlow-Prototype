import express from "express";
import {
	register,
	getUser,
	updateUser,
	deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Ruter for brukerregistrering og brukerhåndtering
router.post("/register", register);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
