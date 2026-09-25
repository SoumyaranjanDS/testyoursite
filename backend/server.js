require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const testRoutes = require("./routes/testRoutes");

// Connect to database
connectDB().then(async () => {
  // Clean up any orphaned tests that were left 'running' when the server last shut down
  const LoadTest = require("./models/LoadTest");
  try {
    await LoadTest.updateMany(
      { status: "running" },
      {
        $set: {
          status: "failed",
          errorMessage: "Test aborted due to server restart",
        },
      },
    );
  } catch (err) {
    console.error("Error cleaning up orphaned tests:", err);
  }
});

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 1000 requests per windowMs
  message: { message: "Too many requests, please try again later." },
  handler: (req, res, next, options) => {
    console.log(
      `[RATE LIMIT] IP ${req.ip} exceeded the rate limit! Blocking request.`,
    );
    res.status(options.statusCode).send(options.message);
  },
});

// Apply rate limiter to all requests
app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tests", testRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("TestYourSite API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
