import jwt, { JwtPayload } from "jsonwebtoken"
import User from "../models/userModel";
import mongoose from "mongoose";

const protectRoute = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' })
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }


    req.user = user;

    next();

  } catch(error: any) {
    res.status(500).json({ error: "Internal server error"})
  }
}

export default protectRoute;