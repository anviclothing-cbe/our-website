import mongoose from "mongoose";
import { logger } from "./logger.js";

const MONGODB_URL = process.env.MONGODB_URL;

export async function connectDB(): Promise<void> {
  if (!MONGODB_URL) {
    logger.error("MONGODB_URL environment variable is missing.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URL);
    logger.info({ url: MONGODB_URL }, "MongoDB connected");
  } catch (err) {
    logger.error({ err }, "MongoDB connection failed");
    process.exit(1);
  }
}

mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  logger.info("MongoDB reconnected");
});
