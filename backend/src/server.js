import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./Config/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

try {
  await connectDB();

  console.log("✅ MongoDB Connected");

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
} catch (error) {
  console.error("Failed to start server:", error);
  process.exit(1);
}
