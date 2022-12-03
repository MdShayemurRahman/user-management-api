import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'minimum 2 charcaters for name'],
    maxlength: [31, 'maximum 31 charcaters for name'],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  about: String,
  isAdmin: {
    default: 0, // 0 user, 1 admin
  },
});

export const User = mongoose.model('User', userSchema);
