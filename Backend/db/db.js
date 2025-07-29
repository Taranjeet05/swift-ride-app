import mongoose from "mongoose";

function connectToDb() {
  const dbUri = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

  mongoose
    .connect(dbUri)
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
}

export default connectToDb;
