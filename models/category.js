import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('category', categorySchema);
