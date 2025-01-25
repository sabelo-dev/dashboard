import mongoose from "mongoose";

const ModelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Model = mongoose.models.Model || mongoose.model("Model", ModelSchema);

export default Model;