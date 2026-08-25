import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  source: { type: String, default: "Popup" },
  createdAt: { type: Date, default: Date.now }
});

export const Lead = mongoose.model("Lead", leadSchema);
