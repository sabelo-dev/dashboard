// models/Sale.ts
import mongoose, { Document, Schema } from 'mongoose';

// Define the Sale interface
interface ISale extends Document {
  customerId: mongoose.Types.ObjectId;
  productIds: mongoose.Types.ObjectId[];
  amount: number;
  date: Date;
}

// Create the Sale schema
const saleSchema: Schema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productIds: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now, required: true },
}, { timestamps: true });

// Export the Sale model
export default mongoose.models.Sale || mongoose.model<ISale>('Sale', saleSchema);
