import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  id: { type: String, required: true },
  fullName: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    addresses: { type: [addressSchema], default: [] },
  },
  { timestamps: true }
);

// Method to safely return user details without password
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  
  // Transform _id to id to match frontend expectation
  if (user._id) {
    user.id = user._id.toString();
  }
  
  delete user.password;
  delete user._id;
  delete user.__v;
  
  return user;
};

export const User = mongoose.model("User", userSchema);
