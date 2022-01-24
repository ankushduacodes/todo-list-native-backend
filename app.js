import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
import dbConnect from './src/db/index.js';
import UserRoutes from './src/router/userRoutes.js';
import todoRoutes from './src/router/todoRoutes.js';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
dbConnect();
app.use('/api/v1/user/', UserRoutes);
app.use('/api/v1/todo/', todoRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on http://localhost:${port}`);
});
