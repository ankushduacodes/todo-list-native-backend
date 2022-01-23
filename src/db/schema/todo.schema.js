import mongoose from 'mongoose';
import crypto from 'crypto';

const { Schema } = mongoose;

const todoSchema = new Schema({
  todoId: {
    type: String,
    default: crypto.randomBytes(64).toString('hex'),
  },
  item: {
    type: String,
    required: true,
    trim: true,
    min: 1,
  },
  isDone: {
    type: Boolean,
    required: true,
  },
  isImportant: {
    type: Boolean,
    required: true,
  },
  isBookmark: {
    type: Boolean,
    required: true,
  },
  isFavourite: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model('Todo', todoSchema);
