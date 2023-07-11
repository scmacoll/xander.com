require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch((err: any) => console.error(`Connection error: ${err}`));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

