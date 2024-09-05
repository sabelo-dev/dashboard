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
const userSchema = new Schema({
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
        required: [false, "Input contact number"],
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
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    brandDetails: {
        type: brandDetailsSchema,
        required: true, // Making brand details required
    },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
