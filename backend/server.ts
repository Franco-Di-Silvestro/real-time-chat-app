import path from "path";
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

app.use(express.static(path.join(__dirname, "../frontend/dist")));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});


server.listen(PORT, () => {
  connectToMongoDB()
 
  
});