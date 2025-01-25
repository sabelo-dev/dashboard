import mongoose, { Schema } from "mongoose";

// Schema for brand details
const brandDetailsSchema = new Schema({
  brandName: {
    type: String,
    required: [true, "Input brand name"],
  },
  brandAddress: {
    type: String,
    required: [true, "Input brand address"],
  },
  estDate: {
    type: Date,
    required: [true, "Input establishment date"],
  },
});

// Main user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Input username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Input email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Input password"],
    },
    contactNumber: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: {
      type: Date,
      default: null,
    },
    verifyToken: String,
    verifyTokenExpiry: {
      type: Date,
      default: null,
    },
    brandDetails: {
      type: brandDetailsSchema,
      required: true,
    },
  },
  { timestamps: true }
);

// Indexes
userSchema.index({ username: 1, email: 1 }, { unique: true });

// Middleware for handling duplicate key errors
userSchema.post("save", (error, doc, next) => {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("Duplicate key error: A user with this username or email already exists."));
  } else {
    next(error);
  }
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
