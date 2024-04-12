import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dogRoute from "./dogRoute.js"; // Ensure this path matches the location of your dogRoute.js file
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5024;
app.use(cors());

app.use(express.json());
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.use("/api/dogs", dogRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
