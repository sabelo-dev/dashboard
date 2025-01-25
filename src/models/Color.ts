import mongoose from "mongoose";

const ColorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            enum: ["Red", "Blue", "Green", "Black", "White"], // Example colors
        },
        hexCode: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Color = mongoose.models.Color || mongoose.model("Color", ColorSchema);

export default Color;
