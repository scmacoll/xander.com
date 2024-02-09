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


// Backend (Express Server)
//
// Initialization and Configuration
// The file src/server/server.ts initializes an Express server.
//   It imports and configures dotenv to manage environment variables, allowing you to use process.env to access variables like your MongoDB URI and the port the server runs on.
// CORS (Cross-Origin Resource Sharing) is enabled without specific configuration, allowing requests from any domain. The commented-out part shows how you could restrict it to a specific domain.
//   The MongoDB connection is established using Mongoose with the provided URI and options, logging a success or error message accordingly.
//   The server listens on the specified port, ready to accept requests.
