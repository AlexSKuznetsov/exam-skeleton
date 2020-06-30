import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  login: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.statics.findUserAndLogin = function (userName, userLogin) {
  return this.find({ $or: [{ user: userLogin }, { email: userName }] });
};

const UserModel = mongoose.model('user', userSchema);

export default UserModel;
