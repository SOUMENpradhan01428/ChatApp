import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config();

// ✅ Fix CORS: Allow your frontend
app.use(
    cors({
        origin: ["https://chat-app-lemon-tau.vercel.app"], // ✅ Only allow your frontend
        credentials: true, // ✅ Allow cookies for authentication
        methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Allow these methods
        allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow these headers
    })
);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

// ✅ Fix Mongoose connection
mongoose
    .connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("MongoDB Connection Error:", error));

// Routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

server.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});
