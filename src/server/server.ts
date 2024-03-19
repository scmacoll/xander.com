//src/server/server.ts
import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';

const app = express();
app.use(cors());

//  app.use(
//   cors({
// ?    origin: 'http://your-frontend-domain.com',
//   })
// );

const port = process.env.PORT ? parseInt(process.env.PORT) : 5001;

import cardsRoute from './routes/cards'
app.use('/api', cardsRoute); // api endpoint

const mongooseOptions: any = {
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.MONGO_URI as string, mongooseOptions)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err: Error) => console.error(`Connection error: ${err}`));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});