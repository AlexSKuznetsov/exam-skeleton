import mongoose from 'mongoose';

const postsSchema = new mongoose.Schema({
  title: String,
  body: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
  userCreated: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('post', postsSchema);
