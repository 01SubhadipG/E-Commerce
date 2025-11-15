import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./lib/db.js";
import router from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use('/api/auth', router);
app.use('/api/products', productRouter);

connectDB();
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});