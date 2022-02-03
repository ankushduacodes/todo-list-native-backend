import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
import cors from 'cors';
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
const allowedOrigins = [
  'http://localhost:8080',
  'https://sharp-aryabhata-6f4c7f.netlify.app',
  'http://192.168.1.6:8080/',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 204,
};

// @ts-ignore
app.options('*', cors(corsOptions));
// @ts-ignore
app.use(cors(corsOptions));
app.use('/api/v1/user/', UserRoutes);
app.use('/api/v1/todo/', todoRoutes);

app.get('/api/v1/ping/', (req, res) => {
  res.sendStatus(204);
});

app.get('/favicon.ico', (req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on http://localhost:${port}`);
});
