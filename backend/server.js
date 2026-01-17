import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Callback from "./models/Callback.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.error("MongoDB Error ❌", err));

// Test route
app.get("/", (req, res) => {
  res.send("CareerCoded Backend Running 🚀");
});

// Callback API

app.post("/api/callback", async (req, res) => {
  try {
    const callback = await Callback.create(req.body);

    res.status(201).json({
      success: true,
      message: "Callback request saved successfully",
      data: callback
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});


// app.post("/api/callback", async (req, res) => {
//   try {
//     const callback = new Callback(req.body);
//     await callback.save();

//     res.status(201).json({
//       success: true,
//       message: "Callback request saved successfully"
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to save callback request"
//     });
//   }
// });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
