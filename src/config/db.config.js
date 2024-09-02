const ServerConfig = require("./server.config");
const mongoose = require("mongoose");

/**
 * Establishes a connection to MongoDB using Mongoose.
 *
 * This function asynchronously connects to the MongoDB database using
 * the connection string provided in the ServerConfig. It logs a success
 * message upon successful connection or an error message if the connection
 * fails.
 *
 * @async
 * @function connectToDatabase
 * @throws {Error} Throws an error if the connection to MongoDB fails.
 */
async function connectToDatabase() {
  try {
    await mongoose.connect(ServerConfig.DB_URL);
    console.log("Connected to Database Successfully");
  } catch (error) {
    console.error("Error Connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}

module.exports = connectToDatabase;
