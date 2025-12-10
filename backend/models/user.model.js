import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: [
      {
        name: {
          type: String,
          default: "",
        },
        email: {
          type: String,
          default: "",
        },
        street: {
          type: String,
          default: "",
        },
        city: {
          type: String,
          default: "",
        },
        state: {
          type: String,
          default: "",
        },
        zip: {
          type: String,
          default: "",
        },
        country: {
          type: String,
          default: "",
        },
        phone: {
          type: String,
          default: "",
        },
      },
    ],
    role: {
      type: String,
      default: "customer",
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);
export default User;
