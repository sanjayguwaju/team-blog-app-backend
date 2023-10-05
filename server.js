// Import required packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user-routes');
const blogRoutes = require('./routes/blog-post-routes');
const commentRoutes = require('./routes/comment-routes');
const morgan = require('morgan');
const helmet = require("helmet");
const swaggerUi = require('swagger-ui-express');
const specs = require('./swaggerConfig');


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

  // Parse JSON request bodies
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(helmet());

  //Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Use user routes
app.use("/users",userRoutes);
app.use("/blogs",blogRoutes);
app.use("/comments",commentRoutes);

// Health check endpoint
  app.get('/health', (req, res) => {
  res.status(200).send('API is working fine');
  });

// Start server in the port 3000
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});