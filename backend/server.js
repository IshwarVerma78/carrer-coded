import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Callback from "./models/Callback.js";
import Visitor from "./models/Visitor.js";

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

// API: Get + Increment visitor count

// app.get("/api/visitor", async (req, res) => {
//   try {
//     let visitor = await Visitor.findOne();

//     if (!visitor) {
//       visitor = await Visitor.create({ count: 1 });
//     } else {
//       visitor.count += 1;
//       await visitor.save();
//     }

//     res.status(200).json({
//       success: true,
//       count: visitor.count
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Visitor count failed"
//     });
//   }
// });


// Increment visitor count (Frontend)
app.post("/api/visitor", async (req, res) => {
  try {
    let visitor = await Visitor.findOne();

    if (!visitor) {
      visitor = await Visitor.create({ count: 1 });
    } else {
      visitor.count += 1;
      await visitor.save();
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// Get visitor count (Admin)
app.get("/api/visitor", async (req, res) => {
  try {
    const visitor = await Visitor.findOne();

    res.status(200).json({
      success: true,
      count: visitor ? visitor.count : 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch visitor count"
    });
  }
});


// ADMIN: delete a callback
app.delete("/api/callbacks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Callback.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Callback deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete callback"
    });
  }
});



// ADMIN: get all callbacks
app.get("/api/callbacks", async (req, res) => {
  try {
    const callbacks = await Callback.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: callbacks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch callbacks"
    });
  }
});


// ADMIN LOGIN
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    res.json({
      success: true,
      message: "Login successful"
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid password"
    });
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
