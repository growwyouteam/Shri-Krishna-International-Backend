import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  design: { type: String, required: true },
  image: { type: String, required: true } // Store image URL or filename
}, { timestamps: true });

export default mongoose.model('Product', ProductSchema);
