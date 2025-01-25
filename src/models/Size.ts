import mongoose from "mongoose";

const SizeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            enum: ["Small", "Medium", "Large", "XL"], // Example sizes
        },
    },
    { timestamps: true }
);

const Size = mongoose.models.Size || mongoose.model("Size", SizeSchema);

export default Size;