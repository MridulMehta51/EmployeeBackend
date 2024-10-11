const AWS = require("aws-sdk");

// DynamoDB client setup
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoDB;
