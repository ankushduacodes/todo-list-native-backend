import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    min: 2,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    validate: {
      validator: (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
      message: 'Please enter a valid email',
    },
    required: true,
    unique: true,
    trim: true,
    min: 5,
    max: 50,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model('User', UserSchema);
