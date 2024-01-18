// Import environment configuration
require("dotenv").config();

// Import external packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const hpp = require("hpp");
const xss = require("xss-clean");
const helmet = require("helmet");
// eslint-disable-next-line no-unused-vars
const colors = require("colors");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Import local configurations
const swaggerDefinition = require("./swaggerConfig");

// Import routes
const blogRoutes = require("./routes/blog-post-routes");
const userRoutes = require("./routes/user-routes");
const commentRoutes = require("./routes/comment-routes");

// Intialize the express server
const app = express();

// Connect to database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`DB Connection Successfull!`.inverse.blue))
  .catch((err) => {
    console.log("DB Connection Error :",err);
  });

// Use morgan middleware for logging HTTP requests in development mode
app.use(morgan("dev"));

// Parse JSON request bodies
app.use(express.json());

// Set security headers
app.use(helmet());

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Prevent XSS attacks
app.use(xss());

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ["./routes/*.js"],
});

//Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Use user routes
app.use("/users",userRoutes);
app.use("/blogs",blogRoutes);
app.use("/comments",commentRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send("API is working fine");
});

// Start server in the PORT
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running on PORT:${port}`.inverse.green);
});
