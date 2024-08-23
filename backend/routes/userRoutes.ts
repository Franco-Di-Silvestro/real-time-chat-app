import express from "express";
import protectRoute from "../middleware/protectRoute";
import { getUserById, getUsersForSidebar } from "../controllers/userController";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getUserById)

export default router;