import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import pool from "./config/db.js";
import authRoutes from "./routes/auth.js";
import matchRoutes from "./routes/match.js";
import audioRoutes from "./routes/audio.js";
import chatRoutes from "./routes/chat.js";
import { setupSockets } from "./socket.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

//* Middleware
app.use(cors());
app.use(express.json());

//* Routes
app.use("/api/auth", authRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/audio", audioRoutes);
app.use("/api/chat", chatRoutes);

//* Ensure database is connected
pool
  .connect()
  .then(() => console.log("✅ Database connected in index.js"))
  .catch((err) =>
    console.error("❌ Database connection error in index.js:", err)
  );

// *Setup WebSockets
setupSockets(io);

server.listen(process.env.PORT || 5000, () =>
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
);
