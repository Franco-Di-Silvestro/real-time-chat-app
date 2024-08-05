import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/authRoutes";
import connectToMongoDB from "./db/connectToMongoDb";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/messageRoutes";
import userRoutes from "./routes/userRoutes";
import { app, server } from "./socket/socket";

config();


const PORT = process.env.PORT || 5000;

app.use(express.json())

app.use(cookieParser());

app.use('/api/auth', authRoutes)

app.use('/api/messages', messageRoutes)

app.use('/api/users', userRoutes)

server.listen(PORT, () => {
  connectToMongoDB()
  console.log(`Listening in port ${PORT}`)
});