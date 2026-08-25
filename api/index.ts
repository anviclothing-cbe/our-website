import app from "../server/src/app.js";
import { connectDB } from "../server/src/lib/db.js";

let isConnected = false;

export default async function handler(req: any, res: any) {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  return app(req, res);
}
