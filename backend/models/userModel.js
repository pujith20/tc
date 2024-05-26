import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  gmail: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  cart: {
    type: Map,
    of: {
      quantity: Number,
      price: Number,
      title: String,
      rating: Number,
    },
    default: {},
  },
});

const User = mongoose.model("authentication", userSchema);

export default User;
