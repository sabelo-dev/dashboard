// models/Order.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IOrder extends Document {
  customerId: mongoose.Types.ObjectId;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema: Schema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);