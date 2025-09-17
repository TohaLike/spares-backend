import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { routers } from "./routers/index.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST"],
    origin: process.env.CLIENT_URL,
  })
);

app.use("/api", routers);

const main = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

main();
