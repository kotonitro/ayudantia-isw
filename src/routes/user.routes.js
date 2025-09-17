import express from "express";
import { updateUser, deleteUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();
//Actualizar usuario
router.put("/me", authMiddleware, updateUser);
//Borrar usuario
router.delete("/me", authMiddleware, deleteUser);

export default router;
