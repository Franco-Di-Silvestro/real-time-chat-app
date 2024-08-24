import express from "express";
import { login, logOut, signUp } from "../controllers/authController";


const router = express.Router();

router.post("/login", login)

router.post("/signup", signUp)

router.post("/logout", logOut)

export default router;