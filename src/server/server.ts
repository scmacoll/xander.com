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

// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const port = process.env.PORT || 5001;

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('Successfully connected to mongodb'))
//   .catch((err: any) => console.error(`Connection error: ${err}`));

// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });

//##################################################
// Additionally, be aware that this setting will allow all origins. In a production setting, you'd want to configure the CORS middleware to restrict the allowed origins to just your frontend's domain to prevent other domains from making requests to your server. You can do this by passing an options object to the cors function like so:

// app.use(cors({
//   origin: 'http://your-frontend-domain.com'
// }));

// One more thing, this solution is okay for development but for production you should either use a reverse proxy (like Nginx) to serve both your frontend and backend under the same domain, or use Next.js API routes as mentioned in the previous response.
//##################################################
