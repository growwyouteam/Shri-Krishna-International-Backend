import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  design: { type: String, required: true },
  image: { data: Buffer, contentType: String },
}, { timestamps: true });

export default mongoose.model('Product', ProductSchema);
