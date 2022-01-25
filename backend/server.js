import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/DB.js";
import farmRouter from "./routes/farmRoutes.js";

dotenv.config();
connectDB();
const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/farms", farmRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
