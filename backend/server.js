const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("CareerCoded Backend Running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
