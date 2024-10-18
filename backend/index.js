import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDb } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true })); // allows requests from our frontend

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json()); // allows us to parse incoming requests (req.body) with JSON payloads
app.use(cookieParser()); // allows us to parse cookies attached to the client request

app.use("/api/v1/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(process.env.PORT, () => {
  connectDb();
  console.log(`Server is running on port ${process.env.PORT}`);
});
