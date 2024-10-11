const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const serverless = require("serverless-http");
dotenv.config({ path: "./config.env" });
const Employee = require("./routes/Employee");

// AWS SDK configuration
const AWS = require("aws-sdk");
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'http://44.223.18.91'],  // Allow requests from the frontend's origin
  methods: 'GET,POST,PUT,DELETE',  // Specify allowed methods
  allowedHeaders: 'Content-Type,Authorization',  // Specify allowed headers
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/employees", Employee);  // Make sure to load employee routes

// Export the app as a Lambda handler
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});