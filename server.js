// Import required packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


// Server function stored in app variable
const app = express();

// Connect to database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connection Successfull!'))
  .catch((err) => {
    console.log("DB Connection Error :",err);
  });


// Start server in the port 3000
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});