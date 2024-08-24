import express from "express";
import { login, logOut, recoverPassword, signUp } from "../controllers/authController";


const router = express.Router();

router.post("/login", login)

router.post("/signup", signUp)

router.post("/logout", logOut)

router.post("/recover-password", recoverPassword)


export default router;