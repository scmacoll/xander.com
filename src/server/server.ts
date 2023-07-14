//src/server/server.ts
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
const port = process.env.PORT ? parseInt(process.env.PORT) : 5001;

const cardsRoute = require('./routes/cards');
app.use('/api', cardsRoute); // api endpoint

const mongooseOptions = {
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.MONGO_URI, mongooseOptions)
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
