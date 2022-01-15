import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
// eslint-disable-next-line import/extensions
import dbConnect from './src/db/index.js';

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

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on http://localhost:${port}`);
});
