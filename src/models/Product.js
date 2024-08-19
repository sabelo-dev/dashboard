import mongoose, { Schema } from "mongoose";

const ModelSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
        required:true
    }
});

const Product = mongoose.models.products || mongoose.model 
("products", userSchema);

export default Product;

