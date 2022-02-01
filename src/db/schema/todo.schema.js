import mongoose from 'mongoose';
// import crypto from 'crypto';

const { Schema } = mongoose;

const todoSchema = new Schema({
  todoId: {
    type: String,
    required: true,
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
    default: false,
  },
  isImportant: {
    type: Boolean,
    required: true,
    default: false,
  },
  isBookmark: {
    type: Boolean,
    required: true,
    default: false,
  },
  isFavourite: {
    type: Boolean,
    required: true,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model('Todo', todoSchema);
