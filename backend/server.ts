import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/authRoutes";
import connectToMongoDB from "./db/connectToMongoDb";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/messageRoutes";
import userRoutes from "./routes/userRoutes";

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())

app.use(cookieParser());

app.use('/api/auth', authRoutes)

app.use('/api/messages', messageRoutes)

app.use('/api/users', userRoutes)

app.listen(PORT, () => {
  connectToMongoDB()
  console.log(`Listening in port ${PORT}`)});