import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  college: { type: String, default: "" },
  gender: { type: String, enum: ['male', 'female', 'other', ''], default: "" }
});

export default mongoose.model('User', userSchema);
