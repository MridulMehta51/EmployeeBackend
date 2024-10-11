const express = require("express");
const router = express.Router();
const dynamoDB = require("../config/db");  // Load DynamoDB configuration

// POST route - Add a new employee
router.post("/", async (req, res) => {
    const { name, email, phone, position } = req.body;
  
    // Step 1: Check if the email already exists
    const checkParams = {
      TableName: "Employee",  // DynamoDB table name
      Key: {
        email: email,  // Use email as the primary key
      },
    };
  
    try {
      // Check if the employee already exists
      const existingEmployee = await dynamoDB.get(checkParams).promise();

      // If the email exists, respond with an error
      if (existingEmployee.Item) {
        return res.status(400).json({
          message: "Employee with this email already exists",
        });
      }
  
      // Step 2: If the email doesn't exist, proceed with adding the employee
      const params = {
        TableName: "Employee",
        Item: {
          email: email,  // Primary key (unique)
          name: name,
          phone: phone,
          position: position,
        },
      };
  
      await dynamoDB.put(params).promise();
  
      // Respond with success
      res.status(201).json({ message: "Employee added successfully", employee: params.Item });
  
    } catch (err) {
      console.error("Error adding employee:", err);
      res.status(500).json({ message: "Failed to add employee", error: err.message });
    }
});

// GET route - Retrieve all employees
router.get("/", async (req, res) => {
  const params = {
    TableName: "Employee",  // DynamoDB table name
  };

  try {
    // Fetch all employees from DynamoDB
    const data = await dynamoDB.scan(params).promise();
    res.json(data.Items);  // Returns an array of employees
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch employees", error: err.message });
  }
});

module.exports = router;