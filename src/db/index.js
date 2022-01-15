import mongoose from 'mongoose';

export default function dbConnect() {
  const username = process.env.MONGO_USERNAME;
  const password = process.env.MONGO_PASSWORD;
  const mongoURI = `mongodb+srv://${username}:${password}@todo-list-cluster.a1khr.mongodb.net/todos?retryWrites=true&w=majority`;
  mongoose.connect(
    mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );
  const db = mongoose.connection;
  // eslint-disable-next-line no-console
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  // eslint-disable-next-line no-console
  db.once('connected', () => console.log('Connection Successful'));
}
